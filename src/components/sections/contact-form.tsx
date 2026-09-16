"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const budgets = ["Under ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"];
const ease = [0.16, 1, 0.3, 1] as const;

function Field({
  label,
  textarea,
  error,
  ...props
}: { label: string; textarea?: boolean; error?: string } & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const shared = cn(
    "peer block w-full rounded-none border-0 border-b bg-transparent px-0 pt-6 pb-2.5 text-[15px] text-foreground outline-none transition-colors duration-300 placeholder:text-transparent",
    error ? "border-red-500" : "border-line-strong focus:border-accent"
  );
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} placeholder={label} rows={4} className={cn(shared, "resize-none")} aria-invalid={!!error} {...props} />
      ) : (
        <input id={id} placeholder={label} className={shared} aria-invalid={!!error} {...props} />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-1 text-xs text-muted transition-all duration-300 ease-out-expo",
          "peer-placeholder-shown:top-6 peer-placeholder-shown:text-[15px]",
          "peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent-ink"
        )}
      >
        {label}
      </label>
      {/* Focus line grows from the left */}
      <span aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo peer-focus:scale-x-100" />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-all duration-300 active:scale-95",
        selected
          ? "border-accent bg-accent text-white"
          : "border-line-strong text-foreground hover:border-foreground"
      )}
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <Check className="size-3.5" strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </button>
  );
}

export function ContactForm({ initialService }: { initialService?: string }) {
  const [selected, setSelected] = useState<string[]>(
    initialService && services.some((s) => s.slug === initialService) ? [initialService] : []
  );
  const [budget, setBudget] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggle = (slug: string) =>
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) next.name = "Enter your name so we know who to reply to.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") || ""))) next.email = "Enter a valid email, like name@company.com.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    // TODO: send `data`, `selected` and `budget` to your API route, Formspree, Resend, etc.
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex min-h-[520px] flex-col items-start justify-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-accent text-white"
            >
              <Check className="size-7" strokeWidth={2.5} />
            </motion.span>
            <h2 className="mt-8 text-3xl font-medium tracking-[-0.03em]">Message sent.</h2>
            <p className="mt-3 max-w-sm text-muted">
              Thanks for reaching out. We&apos;ll reply within one working day with next steps.
            </p>
            <Button className="mt-8" variant="outline" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-10"
          >
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Your name" name="name" autoComplete="name" error={errors.name} />
              <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
              <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
              <Field label="Company (optional)" name="company" autoComplete="organization" />
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">What do you need help with?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <Chip key={s.slug} selected={selected.includes(s.slug)} onClick={() => toggle(s.slug)}>
                    {s.title}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold">Estimated budget</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <Chip key={b} selected={budget === b} onClick={() => setBudget(budget === b ? null : b)}>
                    {b}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <Field label="Tell us about your project" name="message" textarea />

            <Button type="submit" size="lg" arrow={status === "idle"} disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
