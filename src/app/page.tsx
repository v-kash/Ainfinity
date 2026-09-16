import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <ServicesGrid />
      <Process />
      <Stats />
      <FeaturedWork />
      <Testimonials />
      <Cta />
    </>
  );
}
