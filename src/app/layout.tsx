import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { site } from "@/lib/site";
import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: { default: `${site.name} — Where Technology Meets Possibility`, template: `%s — ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <Providers>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-foreground px-4 py-2 text-sm text-background focus:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <ChatWidget />
      </body>
    </html>
  );
}
