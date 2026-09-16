import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Renders both logos and lets CSS pick one based on the theme class,
 * so there's no flicker or hydration mismatch when the page loads.
 */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const { onLight, onDark, width, height } = site.logo;
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} home`}
      className={cn("relative inline-flex shrink-0 items-center", className)}
      style={{ width, height }}
    >
      <Image src={onLight} alt={site.name} width={width} height={height} unoptimized preload className="h-full w-auto object-contain dark:hidden" />
      <Image src={onDark} alt={site.name} width={width} height={height} unoptimized preload className="hidden h-full w-auto object-contain dark:block" />
    </Link>
  );
}
