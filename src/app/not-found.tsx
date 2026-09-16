import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-[76px]">
      <Container>
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.8rem)] font-medium leading-none tracking-[-0.045em]">
          This page doesn&apos;t <span className="text-accent">exist.</span>
        </h1>
        <p className="mt-5 max-w-md text-muted">The link may be old or mistyped. Head back home or browse our services.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" arrow>Go to Home</Button>
          <Button href="/services" variant="outline">Browse Services</Button>
        </div>
      </Container>
    </section>
  );
}
