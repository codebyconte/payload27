import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Set VITE_SITE_URL for a custom domain. Vercel supplies its production hostname.
  const configured = env.VITE_SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : env.VERCEL_URL ? `https://${env.VERCEL_URL}` : '');
  const origin = configured ? new URL(configured).origin : '';
  return {
    plugins: [react(), tailwindcss(), {
      name: 'p27-social-metadata',
      transformIndexHtml: {
        order: 'pre',
        handler(html, context) {
          const previewOrigin = context.server ? 'http://localhost:5173' : '';
          return html.replaceAll('__SOCIAL_IMAGE__', `${origin || previewOrigin}/hero.jpg`);
        },
      },
    }],
  };
});
