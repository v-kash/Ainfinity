import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

export function PageHero({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-[140px] pb-14 md:pt-[170px] md:pb-20">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 size-[520px] rounded-full bg-accent/20 blur-[120px] dark:bg-accent/25"
      />
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.045em]">
          {title} <span className="text-accent">{accent}</span>
        </h1>
        {children}
      </Container>
    </section>
  );
}
