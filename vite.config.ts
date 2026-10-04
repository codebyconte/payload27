import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seo } from './src/seo';
import { project } from './src/config';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const site = new URL(env.VITE_SITE_URL || seo.siteUrl);
  if (site.protocol !== 'https:') throw new Error('SEO site origin must use HTTPS.');
  const origin = site.origin;
  const canonical = `${origin}/`;
  const image = `${origin}${seo.socialImage}`;
  const escape = (value: string) => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  const preview = env.VERCEL_ENV === 'preview';
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${canonical}#organization`, name: 'PAYLOAD 27', url: canonical,
        logo: { '@type': 'ImageObject', url: `${origin}/favicon.svg` }, sameAs: [project.twitter, project.telegram] },
      { '@type': 'WebSite', '@id': `${canonical}#website`, url: canonical, name: 'PAYLOAD 27', alternateName: '$P27', inLanguage: 'en', publisher: { '@id': `${canonical}#organization` } },
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: seo.title, description: seo.description,
        inLanguage: 'en', isPartOf: { '@id': `${canonical}#website` }, about: { '@id': `${canonical}#organization` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } },
    ],
  };
  return { plugins: [react(), tailwindcss(), {
    name: 'p27-seo',
    transformIndexHtml: { order: 'pre', handler(html, ctx) {
      const robots = ctx.server || preview ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
      const tags = `<link rel="canonical" href="${escape(canonical)}"/>\n<meta name="robots" content="${robots}"/>\n<meta property="og:url" content="${escape(canonical)}"/>\n<meta property="og:site_name" content="PAYLOAD 27"/>\n<meta property="og:locale" content="en_US"/>\n<meta property="og:image:secure_url" content="${escape(image)}"/>\n<meta property="og:image:type" content="image/jpeg"/>\n<meta name="twitter:site" content="@Payload_27"/>\n<script type="application/ld+json">${JSON.stringify(structured).replaceAll('<','\\u003c')}</script>`;
      return html.replaceAll('__SOCIAL_IMAGE__', escape(image)).replace('</head>', `${tags}\n</head>`);
    } },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n` });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(canonical)}</loc></url></urlset>\n` });
    },
  }] };
});
