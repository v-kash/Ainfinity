import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getService, serviceGroups, services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowSwap } from "@/components/ui/arrow-icon";
import { ServiceIcon } from "@/components/ui/service-icon";
import { SmartImage } from "@/components/ui/smart-image";
import { Process } from "@/components/sections/process";
import { Cta } from "@/components/sections/cta";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === slug);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const siblings = services.filter((s) => s.group === service.group && s.slug !== slug);

  return (
    <>
      <section className="relative overflow-hidden pt-[120px] pb-16 md:pt-[150px]">
        <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[480px] rounded-full bg-accent/15 blur-[120px]" />
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
              <li aria-hidden>/</li>
              <li className="text-foreground">{service.title}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-white">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>
                <span className="text-sm text-muted">
                  {service.number} · {serviceGroups[service.group].title}
                </span>
              </div>
              <h1 className="mt-6 text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                {service.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`/contact?service=${service.slug}`} size="lg" arrow>
                  Discuss Your Project
                </Button>
                <Button href="#included" size="lg" variant="outline">
                  See What&apos;s Included
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface lg:col-span-5">
              <SmartImage src={service.image} alt={service.title} sizes="(min-width: 1024px) 40vw, 100vw" preload />
            </div>
          </div>
        </Container>
      </section>

      <section id="included" className="border-t border-line py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]">
                What&apos;s <span className="text-accent">included.</span>
              </h2>
              <p className="mt-3 max-w-sm text-muted">
                Pick one piece or combine several. We&apos;ll recommend the right mix after understanding your goals.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-5 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground/[0.06] transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                    <Check className="size-4" strokeWidth={2.2} />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {siblings.length > 0 && (
            <div className="mt-20">
              <h3 className="text-sm font-semibold">More in {serviceGroups[service.group].title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      <ServiceIcon name={s.icon} className="size-4" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <Process showButton={false} />

      <nav aria-label="Other services" className="grid border-b border-line sm:grid-cols-2">
        {[
          { s: prev, label: "Previous service", align: "sm:border-r" },
          { s: next, label: "Next service", align: "sm:text-right" },
        ].map(({ s, label, align }) => (
          <Link
            key={label}
            href={`/services/${s.slug}`}
            className={`group relative overflow-hidden border-line px-5 py-12 sm:px-10 ${align} border-t sm:border-t-0`}
          >
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
            <span className="relative block text-xs text-muted transition-colors duration-500 group-hover:text-background/60">{label}</span>
            <span className="relative mt-2 inline-flex items-center gap-3 text-[clamp(1.3rem,2.4vw,2rem)] font-medium tracking-[-0.03em] transition-colors duration-500 group-hover:text-background">
              {s.title}
              <ArrowSwap className="size-5" />
            </span>
          </Link>
        ))}
      </nav>

      <div className="pt-20 md:pt-24">
        <Cta />
      </div>
    </>
  );
}
