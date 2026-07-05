# The 90 Day Detox — Next.js Rebuild

A modern rebuild of the Canva-based site, using Next.js 14 (App Router) + Tailwind CSS.

## Design direction

- **Palette:** Deep Forest, Golden Ochre, Sage, Blush Clay, Milk Sage (background), Ink (text)
- **Type:** Fraunces (display) + Inter (body)
- **Signature element:** the *Phase Ring* — a circular Cleanse → Rebuild → Thrive indicator
  that fills in as the visitor scrolls, mirroring the program's real 3-phase structure.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Deploying

This is a standard Next.js app — deploys cleanly to Vercel (recommended, same platform
ConvoForms uses), Netlify, or any Node host. On Vercel: push to a GitHub repo, import it
in Vercel, done — no config needed.

## Photo placeholders — what to shoot / gather

Every spot below is marked in the live site with a dashed frame and label. Replace each
`<PlaceholderFrame>` in the component files with a real `next/image` once you have the photo.

| Location | Component | What's needed |
|---|---|---|
| Hero, large | `components/Hero.tsx` | Wide lifestyle photo, energetic, natural light |
| Hero, small | `components/Hero.tsx` | Close-up portrait, warm smile |
| Hero, small | `components/Hero.tsx` | Product flat-lay (supplements + meal plan) |
| Outcome card 1 | `components/ProblemSection.tsx` | Two-person "aha" moment photo |
| Outcome card 2 | `components/ProblemSection.tsx` | Client testimonial-style photo |
| Outcome card 3 | `components/ProblemSection.tsx` | Before/after or energy-log photo |
| Product banner | `components/ProductBanner.tsx` | Supplement lineup flat-lay |
| Video section | `components/VideoEducation.tsx` | Replace with real YouTube/Vimeo embed |
| Final CTA | `components/FinalCTA.tsx` | Ebook cover mockup |
| Final CTA | `components/FinalCTA.tsx` | Free-gift bundle flat-lay |

### Swapping a placeholder for a real photo

```tsx
// Before
<PlaceholderFrame label="..." aspect="aspect-[4/5]" shape="arch" tone="ochre" />

// After
import Image from 'next/image';

<div className="relative aspect-[4/5] rounded-arch overflow-hidden">
  <Image src="/images/hero-portrait.jpg" alt="Describe the photo" fill className="object-cover" />
</div>
```

Drop real photos into the `public/images/` folder first.

## SEO already wired up

- Full metadata (title, description, Open Graph, Twitter cards) in `app/layout.tsx`
- `Service` structured data (schema.org) describing the program and pricing tiers
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic heading structure (one H1 in the hero, H2s per section)

Before launch, update `siteUrl` in `app/layout.tsx` and `app/sitemap.ts`/`app/robots.ts`
to your real domain, and add a real `public/og-image.jpg` (1200×630).
