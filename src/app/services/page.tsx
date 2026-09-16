import type { Metadata } from "next";
import { positioning, services } from "@/lib/services";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesIndex } from "@/components/sections/services-index";
import { Process } from "@/components/sections/process";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services",
  description: "Web, mobile, marketing, branding, AI automation, WhatsApp commerce, custom platforms and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Everything your business needs to" accent="grow online.">
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            {services.length} service areas in two levels: essential digital services, and higher-value growth and
            technology solutions.
          </p>
          <div className="flex gap-3">
            <Button href="#core" variant="outline" size="sm">Core Services</Button>
            <Button href="#growth" variant="outline" size="sm">Growth & Technology</Button>
          </div>
        </div>
      </PageHero>

      <ServicesIndex />

      <section className="border-t border-line py-14">
        <Container>
          <p className="max-w-3xl text-[clamp(1.15rem,1.8vw,1.5rem)] leading-relaxed tracking-[-0.01em]">{positioning}</p>
        </Container>
      </section>

      <Process showButton={false} />
      <div className="pt-20 md:pt-24">
        <Cta />
      </div>
    </>
  );
}
