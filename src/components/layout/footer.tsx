import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { Logo } from "./logo";

const linkClass =
  "relative w-fit text-sm text-muted transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100";

const footerServices = [
  { label: "Web Development", slug: "web-digital-experience" },
  { label: "Digital Marketing", slug: "digital-marketing-seo" },
  { label: "AI Automation", slug: "ai-business-automation" },
  { label: "Mobile Apps", slug: "mobile-app-development" },
  { label: "Branding", slug: "branding-creative" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-background pt-16 pb-8">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
            <ul className="mt-6 flex gap-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full border border-line-strong text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <SocialIcon name={s.icon} className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Services</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {footerServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={linkClass}>
                      {s.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className={`${linkClass} text-foreground`}>View All</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-foreground">Contact</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-foreground" strokeWidth={1.6} />
                  {site.contact.address}
                </li>
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 size-4 shrink-0 text-foreground" strokeWidth={1.6} />
                  <a href={`mailto:${site.contact.email}`} className={linkClass}>{site.contact.email}</a>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-foreground" strokeWidth={1.6} />
                  <a href={site.contact.phoneHref} className={linkClass}>{site.contact.phone}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="flex gap-5">
            {["Build", "Grow", "Automate", "Transform"].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
