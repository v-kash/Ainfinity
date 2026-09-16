import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project and we'll reply within one working day.",
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { service } = await searchParams;

  const details = [
    { Icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { Icon: Phone, label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
    { Icon: MapPin, label: "Office", value: site.contact.address },
    { Icon: Clock, label: "Response time", value: "Within one working day" },
  ];

  return (
    <section className="relative overflow-hidden pt-[140px] pb-24 md:pt-[170px]">
      <div aria-hidden className="absolute -top-40 -right-40 -z-10 size-[520px] rounded-full bg-accent/20 blur-[120px]" />
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.6rem,5.5vw,4.4rem)] font-medium leading-[1] tracking-[-0.045em]">
              Tell us what you want to <span className="text-accent">build.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Share a few details about your business and goals. We&apos;ll come back with questions, ideas and an
              honest estimate.
            </p>
            <ul className="mt-12 divide-y divide-line border-y border-line">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="group flex items-center gap-4 py-4">
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                    <Icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{label}</span>
                    {href ? (
                      <a href={href} className="font-medium transition-colors hover:text-accent-ink">{value}</a>
                    ) : (
                      <span className="font-medium">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <div className="rounded-3xl border border-line bg-card p-6 sm:p-10">
              <ContactForm initialService={typeof service === "string" ? service : undefined} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
