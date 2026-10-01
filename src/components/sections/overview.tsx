import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";

const problems = [
  "Websites that do not generate enough qualified enquiries",
  "Manual lead follow-up and repetitive customer communication",
  "Disconnected CRM, WhatsApp, email and operational workflows",
  "Spreadsheet-heavy reporting and limited management visibility",
  "Business processes that need custom software instead of more manual work",
];

/** Plain-language answers to "what do you do" and "what do you solve", for visitors and answer engines alike. */
export function Overview() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]">
              What does Aarambh Infinity <span className="text-accent">do?</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Aarambh Infinity is a digital technology and growth partner for businesses that need customer-facing
              digital products or better internal systems. Our work spans web development, mobile apps, SEO and
              digital marketing, AI automation, WhatsApp workflows, custom software, dashboards and digital
              transformation.
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]">
              What business problems do we <span className="text-accent">solve?</span>
            </h2>
            <ul className="mt-6 grid gap-3">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-4 rounded-2xl border border-line bg-card px-5 py-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-foreground/[0.06]">
                    <Check className="size-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
