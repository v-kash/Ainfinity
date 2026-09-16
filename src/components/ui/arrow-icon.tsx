import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Arrow that slides out and back in on parent `group` hover. */
export function ArrowSwap({ className, diagonal = false }: { className?: string; diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  const out = diagonal
    ? "group-hover:translate-x-[120%] group-hover:-translate-y-[120%]"
    : "group-hover:translate-x-[130%]";
  const inn = diagonal
    ? "-translate-x-[120%] translate-y-[120%] group-hover:translate-x-0 group-hover:translate-y-0"
    : "-translate-x-[130%] group-hover:translate-x-0";
  return (
    <span aria-hidden className={cn("relative inline-flex size-4 shrink-0 overflow-hidden", className)}>
      <Icon className={cn("absolute inset-0 size-full transition-transform duration-500 ease-out-expo", out)} strokeWidth={2} />
      <Icon className={cn("absolute inset-0 size-full transition-transform duration-500 ease-out-expo", inn)} strokeWidth={2} />
    </span>
  );
}
