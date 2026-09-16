import type { Metadata } from "next";
import { unsplash } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical notes on websites, automation, WhatsApp commerce and AI for growing businesses.",
};

const posts = [
  {
    tag: "WhatsApp",
    title: "WhatsApp Business app or API: which one does your business need?",
    image: unsplash("photo-1512428559087-560fa5ceab42", 900),
  },
  {
    tag: "Automation",
    title: "Five manual processes worth automating first",
    image: unsplash("photo-1485827404703-89b55fcc595e", 900),
  },
  {
    tag: "Software",
    title: "What a CRM should actually do for a 20-person sales team",
    image: unsplash("photo-1551288049-bebda4e38f71", 900),
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Practical notes for" accent="growing businesses.">
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Our first articles are being written. Here&apos;s what&apos;s coming.
        </p>
      </PageHero>
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.title} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                  <SmartImage
                    src={p.image}
                    alt=""
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="duration-[1100ms] ease-out-expo group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    Publishing soon
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold text-accent-ink">{p.tag}</p>
                <h2 className="mt-2 text-xl font-medium leading-snug tracking-[-0.02em]">{p.title}</h2>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Cta />
    </>
  );
}
