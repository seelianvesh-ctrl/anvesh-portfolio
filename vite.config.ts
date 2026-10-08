import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Dev-only: mirror the host's pretty-URL behaviour for the static article pages.
 *
 * In production `/articles/` is served from articles/index.html and
 * `/articles/<slug>` is served from `<slug>.html`. Vite's dev server only
 * resolves exact file paths, so without this the articles fall through to the
 * SPA fallback and preview as the homepage. `apply: 'serve'` keeps it out of
 * the production build.
 */
function prettyArticleUrls(): Plugin {
  return {
    name: 'dev-pretty-article-urls',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = (req.url || '').split('?')[0];
        if (url === '/articles' || url === '/articles/') {
          req.url = '/articles/index.html';
        } else {
          const match = url.match(/^\/articles\/([a-z0-9-]+)$/);
          if (match) req.url = `/articles/${match[1]}.html`;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prettyArticleUrls()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Allow hosted preview domains (wildcard subdomains of the sandbox host)
      // in addition to localhost, so the dev server is reachable from a preview.
      allowedHosts: ['.e2b.app', '.e2b.dev', 'localhost', '127.0.0.1'],
    },
    // Same allowance for `vite preview`, so a production build can also be
    // served behind a hosted preview domain.
    preview: {
      allowedHosts: ['.e2b.app', '.e2b.dev', 'localhost', '127.0.0.1'],
    },
  };
});
