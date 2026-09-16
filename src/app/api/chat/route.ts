import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/chat-knowledge";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 12; // last 12 messages (6 back-and-forths) are sent to Gemini
const RATE_LIMIT = 15; // messages per visitor...
const RATE_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const systemInstruction = buildSystemPrompt();

type ChatMessage = { role: "user" | "assistant"; text: string };

// Simple per-IP limiter kept in memory. It resets when the server restarts and
// isn't shared between serverless instances, which is fine for a small site.
// It stops one visitor from using up your whole free-tier quota.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as any).messages)) return null;
  const raw = (body as any).messages as unknown[];

  const messages = raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as any).role === "user" || (m as any).role === "assistant") &&
        typeof (m as any).text === "string" &&
        (m as any).text.trim().length > 0,
    )
    .map((m) => ({ role: m.role, text: m.text.slice(0, MAX_MESSAGE_CHARS * 4) }))
    .slice(-MAX_HISTORY);

  // Gemini expects the conversation to start with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return null;
  if (last.text.length > MAX_MESSAGE_CHARS) return null;
  return messages;
}

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return jsonError("The chat isn't set up yet. Please use the contact page.", 500);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return jsonError("You've sent a lot of questions. Try again in a few minutes, or use the contact page.", 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  const messages = parseMessages(body);
  if (!messages) {
    return jsonError(`Send a question of up to ${MAX_MESSAGE_CHARS} characters.`, 400);
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text }],
  }));

  let stream: Awaited<ReturnType<typeof ai.models.generateContentStream>>;
  try {
    stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 600,
      },
    });
  } catch (err: any) {
    console.error("Gemini error:", err?.status, err?.message);
    if (err?.status === 429) {
      return jsonError("The assistant is busy right now. Try again in a minute, or use the contact page.", 503);
    }
    return jsonError("The assistant couldn't answer. Try again, or use the contact page.", 502);
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (err: any) {
        console.error("Gemini stream error:", err?.status, err?.message);
        controller.enqueue(encoder.encode("\n\n(The answer was cut off. Try asking again.)"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}