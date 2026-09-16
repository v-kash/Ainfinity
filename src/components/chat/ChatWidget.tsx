"use client";

import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowUp, ArrowUpRight, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { services } from "@/lib/services"; // adjust path if needed
import { mark, MARK_VIEWBOX } from "@/components/layout/logo-paths";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; text: string };

const GREETING = "Hi! Ask me anything about Aarambh Infinity and what we can build for your business.";

const SUGGESTIONS = [
  "What does Aarambh Infinity do?",
  "Can you automate our WhatsApp orders?",
  "I need a website for my business",
];

const ease = [0.16, 1, 0.3, 1] as const;

const bubble = "max-w-[85%] whitespace-pre-wrap rounded-[20px] px-4 py-2.5 text-[14.5px] leading-relaxed [overflow-wrap:anywhere]";
const botBubble = "self-start rounded-bl-md bg-foreground/[0.05] text-foreground";
const userBubble = "self-end rounded-br-md bg-foreground text-background";
const linkClass =
  "font-semibold underline decoration-accent decoration-2 underline-offset-[3px] transition-colors hover:text-accent-ink";

const serviceTitles = new Map(services.map((s) => [`/services/${s.slug}`, s.title]));

/** Turns known page paths in a reply into links. Unknown paths stay as plain text. */
function renderText(text: string) {
  const parts = text.split(/(\/services\/[a-z0-9-]+|\/contact\b)/g);
  return parts.map((part, i) => {
    if (part === "/contact") {
      return (
        <Link key={i} href="/contact" className={linkClass}>
          Contact page
        </Link>
      );
    }
    const title = serviceTitles.get(part);
    if (title) {
      return (
        <Link key={i} href={part} className={linkClass}>
          {title}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** The brand mark in flat colours, for small sizes */
function Mark() {
  return (
    <svg viewBox={MARK_VIEWBOX} width={23} height={16} aria-hidden>
      <path d={mark.loop} className="fill-accent" />
      {mark.a.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
      <path d={mark.triangle} className="fill-accent" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const history: ChatMessage[] = [...messages, { role: "user", text: question }];
    setMessages([...history, { role: "assistant", text: "" }]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "The assistant couldn't answer. Try again, or use the contact page.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", text: answer }]);
      }
      if (!answer.trim()) throw new Error("The assistant returned an empty answer. Try rephrasing your question.");
    } catch (err) {
      setMessages(history.slice(0, -1));
      setInput(question);
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      {/* Only the panel and the launcher take clicks, so the page underneath stays usable */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:left-auto sm:p-6">
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              id={panelId}
              role="dialog"
              aria-label="Chat with Aarambh Infinity"
              // Let the message list scroll on its own instead of the smooth-scrolled page
              data-lenis-prevent
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.25, ease } }}
              transition={{ duration: 0.45, ease }}
              className="pointer-events-auto flex h-[min(620px,calc(100dvh-7.5rem))] w-full origin-bottom-right flex-col overflow-hidden rounded-[28px] border border-line bg-card shadow-[0_30px_80px_-20px_rgb(10_10_10/0.28)] sm:w-[400px] dark:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
            >
              <header className="relative flex items-center gap-3 border-b border-line px-5 py-4">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_160%_at_100%_0%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)]"
                />
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background">
                  <Mark />
                  <span aria-hidden className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                </span>
                <div className="relative min-w-0">
                  <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">Ask about our services</p>
                  <p className="text-xs text-muted">Automated assistant</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    launcherRef.current?.focus();
                  }}
                  aria-label="Close chat"
                  className="relative ml-auto grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <X className="size-[18px]" strokeWidth={1.8} />
                </button>
              </header>

              <div
                ref={listRef}
                aria-live="polite"
                className="flex flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-5 py-5 [scrollbar-width:thin]"
              >
                <div className={cn(bubble, botBubble)}>{GREETING}</div>

                {messages.length === 0 && (
                  <div className="mt-1.5 flex flex-col items-start gap-2">
                    {SUGGESTIONS.map((s, i) => (
                      <motion.button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease }}
                        className="group inline-flex items-center gap-2 rounded-full border border-line-strong py-2 pr-3 pl-3.5 text-left text-[13px] text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/[0.06]"
                      >
                        {s}
                        <ArrowUpRight
                          className="size-3.5 shrink-0 text-muted transition-colors duration-300 group-hover:text-accent"
                          strokeWidth={2}
                        />
                      </motion.button>
                    ))}
                  </div>
                )}

                {messages.map((m, i) =>
                  m.role === "assistant" && !m.text ? (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className={cn(bubble, botBubble, "flex items-center gap-1 py-4")}
                      aria-label="Assistant is typing"
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="size-1.5 rounded-full bg-muted"
                          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className={cn(bubble, m.role === "user" ? userBubble : botBubble)}
                    >
                      {m.role === "assistant" ? renderText(m.text) : m.text}
                    </motion.div>
                  ),
                )}

                {error && (
                  <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-2.5 text-[13px] leading-relaxed text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <div className="border-t border-line p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-end gap-2 rounded-[22px] border border-line bg-background py-1.5 pr-1.5 pl-4 transition-colors duration-300 focus-within:border-foreground/30"
                >
                  <label htmlFor={`${panelId}-input`} className="sr-only">
                    Your question
                  </label>
                  <textarea
                    id={`${panelId}-input`}
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    placeholder="Type your question"
                    rows={1}
                    maxLength={500}
                    // 16px on phones so iOS doesn't zoom in on focus
                    className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-[7px] text-base leading-[22px] text-foreground [field-sizing:content] placeholder:text-muted focus-visible:outline-none sm:text-[15px]"
                  />
                  <button
                    type="submit"
                    aria-label="Send"
                    disabled={loading || !input.trim()}
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-[background-color,color,transform] duration-300 hover:bg-accent-ink active:scale-95 disabled:pointer-events-none disabled:bg-foreground/[0.07] disabled:text-muted"
                  >
                    <ArrowUp className="size-[18px]" strokeWidth={2.2} />
                  </button>
                </form>
                <p className="mt-2 px-2 text-center text-[11px] leading-snug text-muted">
                  AI answers can be wrong. Please don&apos;t share personal details here.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={launcherRef}
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? "Close chat" : "Ask a question"}
          onClick={() => setOpen((o) => !o)}
          className="group pointer-events-auto relative grid size-14 place-items-center rounded-full bg-foreground text-background shadow-[0_14px_36px_-10px_rgb(10_10_10/0.5)] transition-transform duration-500 ease-out-expo hover:scale-[1.06] active:scale-95 dark:shadow-[0_14px_36px_-10px_rgb(0_0_0/0.9)]"
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
              transition={{ duration: 0.35, ease }}
              className="col-start-1 row-start-1 grid place-items-center"
            >
              {open ? <X className="size-[22px]" strokeWidth={1.8} /> : <MessageCircle className="size-[22px]" strokeWidth={1.8} />}
            </motion.span>
          </AnimatePresence>
          {!open && (
            <>
              <span aria-hidden className="absolute top-0.5 right-0.5 size-3 rounded-full bg-accent ring-[3px] ring-background" />
              <span
                aria-hidden
                className="pointer-events-none absolute right-full mr-3 translate-x-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium whitespace-nowrap text-background opacity-0 shadow-lg transition-[opacity,translate] duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
              >
                Ask a question
              </span>
            </>
          )}
        </button>
      </div>
    </MotionConfig>
  );
}
