import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { confirmationEmail, LOGO_CID, teamEmail, type ContactSubmission } from "@/lib/email/contact-template";

export const runtime = "nodejs";

const RATE_LIMIT = 5; // submissions per visitor...
const RATE_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes
const MAX = { name: 100, email: 200, phone: 40, company: 150, budget: 40, message: 5000 };

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Same in-memory limiter approach as the chat route
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

let logo: Buffer | undefined;
const getLogo = async () => (logo ??= await readFile(path.join(process.cwd(), "public/logo/email-logo.png")));

export async function POST(req: Request) {
  if (!resend) return Response.json({ error: "Email is not configured." }, { status: 500 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field
  if (str(body.website, 200)) return Response.json({ ok: true });

  const slugs = Array.isArray(body.services) ? body.services : [];
  const data: ContactSubmission = {
    name: str(body.name, MAX.name),
    email: str(body.email, MAX.email),
    phone: str(body.phone, MAX.phone) || undefined,
    company: str(body.company, MAX.company) || undefined,
    budget: str(body.budget, MAX.budget) || undefined,
    message: str(body.message, MAX.message) || undefined,
    services: services.filter((s) => slugs.includes(s.slug)).map((s) => s.title),
  };

  if (!data.name) return Response.json({ error: "Enter your name." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return Response.json({ error: "Enter a valid email." }, { status: 400 });

  const from = process.env.RESEND_FROM || `${site.name} <onboarding@resend.dev>`;
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const attachments = [{ filename: "logo.png", content: await getLogo(), contentId: LOGO_CID }];

  const team = teamEmail(data);
  const { error } = await resend.emails.send({ from, to, replyTo: data.email, attachments, ...team });
  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Couldn't send your message. Please email us directly." }, { status: 502 });
  }

  // The confirmation is a courtesy; don't fail the request if it bounces
  const confirm = confirmationEmail(data);
  const { error: confirmError } = await resend.emails.send({ from, to: data.email, replyTo: to, attachments, ...confirm });
  if (confirmError) console.error("Resend confirmation error:", confirmError);

  return Response.json({ ok: true });
}
