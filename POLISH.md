# Portfolio Polish Plan

Ordered by effort — smallest first.

---

## 1. Remove unused import in Testimonials

**File:** `src/components/sections/Testimonials.tsx`, line 1  
**Change:** Remove `StarHalf` from the import — it is imported but never used.

```ts
// Before
import { Star, StarHalf } from "lucide-react";

// After
import { Star } from "lucide-react";
```

**Effort:** 30 seconds.

---

## 2. Translate the Testimonials section heading

**Problem:** `Testimonials.tsx` hardcodes `"What Clients Say"` instead of using the dictionary. The section heading stays in English even when a Spanish visitor loads the page.

**Steps:**
1. Add `testimonials.headline` to both dictionary files:
   - `src/dictionaries/en.json` → `"headline": "What Clients Say"`
   - `src/dictionaries/es.json` → `"headline": "Lo Que Dicen Mis Clientes"`
2. Pass `dict` into `Testimonials` (same pattern as `Portfolio`):
   - `[lang]/page.tsx`: `<Testimonials testimonials={testimonials} lang={lang} dict={dict.testimonials} />`
   - `Testimonials.tsx`: add `dict: any` to props, replace the hardcoded string with `{dict.headline}`

**Effort:** ~10 minutes.

---

## 3. Replace `<img>` with `next/image` everywhere

**Problem:** `Portfolio.tsx` and `Testimonials.tsx` use plain `<img>` tags. Next.js warns about this, and it means no automatic lazy-loading, no WebP conversion, and no layout-shift prevention.

**Files to change:**
- `src/components/sections/Portfolio.tsx` — project thumbnail image
- `src/components/sections/Testimonials.tsx` — author avatar image

**Steps:**
1. Add `remotePatterns` to `next.config.ts` to allow external image hosts (at minimum `**` or specific domains you upload to):
   ```ts
   images: {
     remotePatterns: [{ protocol: 'https', hostname: '**' }],
   }
   ```
2. Replace each `<img>` with `<Image>` from `next/image`, providing `width`, `height`, and `alt`. For the portfolio thumbnail (full-bleed inside a positioned container), use `fill` + `sizes` instead of fixed dimensions.

**Effort:** ~30 minutes.

---

## 4. Show Spanish fields on existing testimonial entries in the Admin

**Problem:** The admin list in `AdminTabs.tsx` shows each testimonial's English content only. There is no way to see at a glance whether a Spanish translation has been filled in, or to visually audit what the Spanish-speaking visitor will read.

**Change:** Below the English `content` quote in each testimonial card, add a small secondary block that shows the Spanish content (or a "No Spanish translation" placeholder if empty):

```tsx
<p className="text-sm text-zinc-300 italic leading-relaxed border-l-2 border-zinc-800 pl-4">
  "{t.content}"
</p>
{/* Spanish preview */}
<p className="text-xs text-zinc-600 italic pl-4 border-l-2 border-zinc-700 mt-2">
  ES: {t.content_es || <span className="text-yellow-700">No translation added</span>}
</p>
```

Apply the same pattern to `author_title_es` in the author block.

**Effort:** ~20 minutes.

---

## 5. Add `robots.txt` and `sitemap.xml`

**Why it matters:** Without these, Google may index the admin pages and will not know the canonical structure of the site. This is important if you want the portfolio to rank for your own name.

**Steps:**

**`src/app/robots.ts`** (new file, ~8 lines):
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin' },
    ],
    sitemap: 'https://ricardonieblas.com/sitemap.xml',
  }
}
```

**`src/app/sitemap.ts`** (new file, ~15 lines):
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://ricardonieblas.com/en', lastModified: new Date(), priority: 1 },
    { url: 'https://ricardonieblas.com/es', lastModified: new Date(), priority: 1 },
  ]
}
```

**Effort:** ~15 minutes.

---

## Suggested order of implementation

1. Unused import (#1) — trivial, do it in passing
2. Testimonials heading translation (#2) — completes the i18n work we already did
3. Admin Spanish preview (#4) — makes the bilingual DB feature actually usable day-to-day
4. `next/image` (#3) — polish + performance
5. robots + sitemap (#5) — launch prerequisite for SEO
