# ConvergeFlow — marketing site

Next.js 16 (App Router, Turbopack) · React 19 · CSS Modules + design tokens · GSAP 3 + ScrollTrigger/SplitText · Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender as static)
npm run start
npm run lint
```

## Structure

```
src/
  app/                 layout (fonts, header/footer, Lenis), home, /demo, [...slug] (every other page), not-found, globals.css (tokens)
  content/
    navigation.ts      sitemap IA, mega menus and footer links
    site/              page copy: home, services, audiences, company, brochures, forms, stage photos
  components/
    home/              the home-page sections
    services/          Services hub, stage pages, Who We Help / How It Works pages, Resources
    company/           About, Why ConvergeFlow, Pricing, Contact, Request a Demo
    site/              SitePage (route → layout), FAQ, shared section renderers, Icon, Paper
    layout/            Header (mega menus, mobile sheet), Footer, Preloader
    fx/                Aurora, FloodLayer, ParticleSphere, ScrollText
    motion/            SmoothScroll (Lenis ↔ GSAP ticker), MotionScope (data-anim reveals), useMotion
    content/           JsonLd, Rich
    ui/                ButtonLink, SmartLink (hash-aware links), Logo
  lib/                 gsap.ts (plugins + media queries), site.ts (origin, robots, canonical), siteReady.ts
```

## Animation conventions

- Markup opts into scroll reveals with `data-anim="fade|stagger|words|scrub|stamp"`; `MotionScope` wraps each page so reveals start only after hydration.
- Component choreography uses `useMotion(ref, ({ motion, desktop }) => …)` — a `gsap.matchMedia` context that reverts on unmount and when reduced-motion changes.
- `prefers-reduced-motion: reduce` disables Lenis and every tween; content is never hidden without JavaScript.

## Adding sitemap pages

Navigation lists every sitemap slug, but the header, mega menus and footer only link to built routes. A page is built once it is in `SITE_PAGES` (`src/content/site/index.ts`) and `SitePage` has a layout for it.

## Open items

- The demo form is not connected yet: submit stays disabled with a notice until request delivery and the privacy notice are confirmed.
- The OpenDental page (`/technology/opendental/`) is not built yet, so it isn't linked.
