import cloudflare from '@astrojs/cloudflare'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { i18n } from 'astro-i18n-aut/integration'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

const SRC_DIR = fileURLToPath(new URL('./src/', import.meta.url))

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: cloudflare(),
  build: {
    compressHTML: false,
    inlineStylesheets: 'auto',
  },
  i18n: {
    locales: ['de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'],
    defaultLocale: 'en',
    routing: {
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [
    i18n({
      locales: {
        de: 'de-DE',
        en: 'en-US',
        es: 'es-ES',
        fr: 'fr-FR',
        id: 'id-ID',
        it: 'it-IT',
        ja: 'ja-JP',
        ko: 'ko-KR',
        zh: 'zh-CN',
      },
      defaultLocale: 'en',
      redirectDefaultLocale: true,
    }),
    starlight({
      title: 'Astro Starlight Tailwind Issue',
      prerender: false,
      customCss: ['./src/styles/docs.css'],
      components: {
        Head: './src/components/doc/Head.astro',
        LanguageSelect: './src/components/doc/LanguageSelect.astro',
        PageTitle: './src/components/doc/PageTitle.astro',
      },
      sidebar: [
        {
          label: 'Docs',
          items: [
            { slug: 'docs' },
            { slug: 'docs/getting-started' },
          ],
        },
      ],
    }),
  ],
})
