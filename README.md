# PAYLOAD 27 — official pre-launch

React, Vite, TypeScript, Tailwind CSS. No wallet connection, presale or transactions.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## One launch configuration

Edit `src/config.ts` only. Official socials are already configured:

- X: https://x.com/Payload_27
- Telegram: https://t.me/payload27

`pumpfun` and `contractAddress` remain empty. `launchStatus` automatically stays `prelaunch` until BOTH an official HTTPS URL under pump.fun and a nonempty contract are supplied. Providing both activates live mode: hero/header buy links and contract copy become available. Do not add dummy values.

All social buttons read this configuration. Pre-launch Telegram and X actions open in new tabs with `noopener noreferrer`; there are no buy actions. The contract displays COMING SOON and its copy button is disabled.

## Artwork

`public/hero.jpg` is existing generated P27 artwork. Original official mascot/banner was not supplied. Responsive hero derivative is `hero-mobile.jpg`; illustrated transmission cards use `transmission.jpg`. If you replace `hero.jpg`, regenerate these derivatives too. Alternatively change `heroImage` to a new filename to bypass the default derivatives. Transmission captions and optional replacement image paths live in `src/config.ts`.

## Vercel and social sharing

Import this directory into Vercel. Framework: Vite; build: `npm run build`; output: `dist`.

Open Graph and X share the existing `hero.jpg` artwork. The HTML metadata is produced at build time, so social crawlers do not need JavaScript. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the absolute production image URL automatically; `VERCEL_URL` is a fallback. For a custom domain or another host, set `VITE_SITE_URL` to the actual public HTTPS site origin before building. Do not set an invented domain. Without a public origin the standalone build uses `/hero.jpg`, which must be made absolute before sharing publicly. Local development uses the local preview origin.

The favicon is a compact visor/eyes/27 badge. Replace `public/favicon.svg` if you supply the official mascot icon.

No deployment has been performed.
