# PAYLOAD 27 — LIVE

React, Vite, TypeScript, Tailwind CSS. No wallet connection, presale or transactions.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Verified live configuration

`src/config.ts` contains the official token name, ticker, network, contract, Pump.fun page, X, Telegram, website, Solscan token page, launch transaction, and launch status. The site is LIVE. Purchase buttons only open the official Pump.fun page; there are no wallets or internal swaps.

The contract is shown in token and final CTA areas, with a compact display plus full selectable address. Copy sends the full configured address, shows COPIED for 2.2 seconds, and announces success through an accessible live region. No holder rewards or market statistics are claimed.

## Artwork

`public/hero.jpg` is existing generated P27 artwork. Original official mascot/banner was not supplied. Responsive hero derivative is `hero-mobile.jpg`; illustrated transmission cards use `transmission.jpg`. If you replace `hero.jpg`, regenerate these derivatives too. Alternatively change `heroImage` to a new filename to bypass the default derivatives. Transmission captions and optional replacement image paths live in `src/config.ts`.

## Vercel and social sharing

Import this directory into Vercel. Framework: Vite; build: `npm run build`; output: `dist`.

Open Graph and X share the existing `hero.jpg` artwork. The HTML metadata is produced at build time, so social crawlers do not need JavaScript. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the absolute production image URL automatically; `VERCEL_URL` is a fallback. For a custom domain or another host, set `VITE_SITE_URL` to the actual public HTTPS site origin before building. Do not set an invented domain. Without a public origin the standalone build uses `/hero.jpg`, which must be made absolute before sharing publicly. Local development uses the local preview origin.

The favicon is a compact visor/eyes/27 badge. Replace `public/favicon.svg` if you supply the official mascot icon.

No deployment has been performed.

## SEO production

The official origin is `https://www.payload27.com`, defined in `src/seo.ts`. Optional `VITE_SITE_URL` overrides it for an intentional domain migration; preview deployments retain the official canonical and are noindex.

The build prerenders the same React App into the delivered HTML, then hydrates it in the browser. Titles, descriptions, canonical, Open Graph, X Cards and truthful Organization/WebSite/WebPage JSON-LD are in initial HTML. `robots.txt` and the one-page `sitemap.xml` are generated from the same origin; hash sections are not separate indexable pages. No fabricated financial schema, ratings, statistics or partnerships.

The social card is `public/social-card.jpg` (1200×630). Hashed build assets receive immutable cache headers; the social image uses a short cache so updates propagate. Apex-domain requests redirect permanently to the official www hostname on Vercel. No SPA catch-all rewrites are added.

After publishing, verify the domain and submit `https://www.payload27.com/sitemap.xml` in Google Search Console. Search Console ownership requires the domain owner's account; no ranking or indexing time is guaranteed. Check real Core Web Vitals after traffic arrives. Social platforms may cache previews; use their inspectors or reshare after refresh when changing the card.
