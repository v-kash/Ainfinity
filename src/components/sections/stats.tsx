import { stats } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/section-title";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="py-16 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3">
            <Eyebrow>Real Results</Eyebrow>
            <h2 id="stats-title" className="mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              Numbers
              <br />
              That <span className="text-accent">Matter.</span>
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:col-span-9">
            {stats.map((s) => (
              <div key={s.label} className="group bg-background p-6 transition-colors duration-500 hover:bg-surface">
                <dd className="text-[clamp(2rem,3.4vw,2.9rem)] font-medium tracking-[-0.04em] transition-colors duration-500 group-hover:text-accent">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
