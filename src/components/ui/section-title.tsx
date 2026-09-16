import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em] text-muted", className)}>{children}</p>
  );
}

/** Heading with the closing phrase in brand orange, as in the design. */
export function SectionTitle({
  lines,
  accent,
  as: Tag = "h2",
  className,
}: {
  lines: string[];
  accent: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "text-balance font-medium tracking-[-0.035em] text-foreground",
        "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04]",
        className
      )}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
          {i === lines.length - 1 && (
            <>
              {line ? " " : ""}
              <span className="text-accent">{accent}</span>
            </>
          )}
        </span>
      ))}
    </Tag>
  );
}
