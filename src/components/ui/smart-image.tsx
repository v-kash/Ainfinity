"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with `fill`, a soft fade-in when loaded, and a branded fallback
 * if a remote image fails (handy while you're still on placeholder photos).
 */
export function SmartImage({
  src,
  alt,
  sizes = "100vw",
  className,
  preload,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  preload?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 bg-surface",
          "bg-[radial-gradient(120%_80%_at_80%_10%,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_60%),radial-gradient(90%_70%_at_10%_100%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_70%)]",
          className
        )}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={cn(
        "object-cover transition-[opacity,scale] duration-700",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
