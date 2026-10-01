import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { Overview } from "@/components/sections/overview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { absoluteUrl } from "@/lib/seo";

const title = "Web Development, AI Automation & Custom Software | Aarambh Infinity";

export const metadata: Metadata = {
  title: { absolute: title },
  description:
    "Aarambh Infinity builds websites, mobile apps, AI automation, custom software, digital marketing, WhatsApp systems and analytics solutions for growing businesses.",
  alternates: { canonical: absoluteUrl() },
  openGraph: {
    type: "website",
    url: absoluteUrl(),
    siteName: "Aarambh Infinity",
    locale: "en_IN",
    title,
    description: "Web, mobile, AI automation, custom software, digital marketing and analytics solutions for growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Web, mobile, AI automation, custom software, digital marketing and analytics solutions.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Overview />
      <ServicesGrid />
      <Process />
      <Stats />
      <FeaturedWork />
      <Testimonials />
      <Cta />
    </>
  );
}
