import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";
import { SilkRibbons } from "@/components/visuals/silk-ribbons";

export function Cta() {
  return (
    <section className="pb-20 md:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-14 sm:px-12 md:py-16">
          <div aria-hidden className="absolute inset-0 -z-10">
            <SilkRibbons preset="cta" />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-surface via-surface/80 to-transparent" />
          {/* Planet horizon */}
          <div
            aria-hidden
            className="absolute top-[58%] right-[-10%] -z-10 hidden aspect-square w-[58%] rounded-full border-t-2 border-accent bg-background shadow-[0_-10px_60px_-6px_var(--accent),inset_0_20px_60px_-30px_var(--accent)] md:block"
          />
          <Eyebrow>Let&apos;s Build Together</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            Ready to Build What&apos;s <span className="text-accent">Next?</span>
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Let&apos;s discuss your project and explore how we can help your business grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" arrow>
              Get Started
            </Button>
            <Button href={site.contact.phoneHref} size="lg" variant="outline">
              Schedule a Call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
