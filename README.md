# Aarambh Infinity — Website

Next.js 16 (App Router) · Tailwind CSS v4 · Motion · Lenis · next-themes

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 20.9 or newer.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage (hero, pillars, services, process, numbers, work, testimonials, CTA) |
| `/services` | All 11 service categories in two levels, from your catalogue |
| `/services/[slug]` | A page per service with everything included (11 static pages) |
| `/contact` | Contact form. `/contact?service=<slug>` pre-selects a service |
| `/insights` | Placeholder until your first articles are ready |

## Replace your logos

Put your files in `public/logo/` with these names:

- `logo-light-theme.svg` — shown on the **white** theme (dark-coloured logo)
- `logo-dark-theme.svg` — shown on the **black** theme (white logo)

PNG or WebP works too — just update the paths (and width/height) in `src/lib/site.ts` → `site.logo`.
Also replace `src/app/icon.svg` with your favicon.

## Edit content

Everything text-based lives in two files:

- `src/lib/services.ts` — service categories, descriptions, sub-services, images
- `src/lib/site.ts` — contact details, socials, nav, stats, pillars, process, featured work, testimonials

## Images

Images currently come from Unsplash (allowed in `next.config.ts`). To use your own, drop files in
`public/images/` and change the URLs in the two content files (e.g. `"/images/real-estate.jpg"`).
If a remote image ever fails, a branded orange gradient is shown instead.

## Themes

- Light is the default; the toggle in the navbar switches to dark (saved in localStorage).
- Colours are CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark).
  The brand orange is `--accent`.

## Before launch — placeholders to replace

- Testimonials in `src/lib/site.ts` (the 2nd and 3rd are invented examples)
- Stats (50+, 30+, 5+, 98%), phone number and email
- Featured work items
- The contact form doesn't send anywhere yet. Hook it up in
  `src/components/sections/contact-form.tsx` (look for `TODO`) — e.g. a Next.js route handler with
  Resend, or Formspree.

## Interactions included

- Generative silk-ribbon animation (canvas) in the hero and CTA, reacting to the cursor
- Circular reveal theme switch (View Transitions API, falls back gracefully)
- Smooth scrolling (Lenis) and a scroll progress bar
- Headline line-by-line reveal on load
- Magnetic buttons with rising fill and sliding arrows
- Navbar: hover pill, hides on scroll down / returns on scroll up, full-screen mobile menu
- Pillar panels that expand on hover and auto-cycle
- Service filter tabs with animated layout, cursor spotlight on cards
- Service slide-over panel with every sub-service and prev/next navigation
- Scroll-linked process timeline
- Count-up numbers
- Work cards with a cursor-following "Explore" bubble
- Testimonial carousel with progress timer (pauses on hover)
- Services page list with a floating image preview that follows the cursor
- Contact form with floating labels, selectable chips and a success state

All motion respects the "reduce motion" accessibility setting.

## Performance

- The silk animation is drawn in a Web Worker (`src/components/visuals/silk.worker.ts`) on an
  OffscreenCanvas, so scrolling and hover effects never wait on it. Older browsers fall back to
  the main thread automatically. It pauses when off-screen or in a background tab, and drops to
  30fps on slow devices.
- Tune the look in `src/components/visuals/silk-renderer.ts`: `lines` per ribbon (fewer = lighter),
  `STEPS`, and the `alpha` values for brightness.
- The pillar panels use CSS transforms for the slant and a grid-column transition for widening,
  avoiding clip-path and filter animations that repaint large images every frame.
