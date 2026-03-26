import cloudflare from '@astrojs/cloudflare'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { i18n } from 'astro-i18n-aut/integration'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: cloudflare(),
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    i18n({
      locales: {
        en: 'en-US',
        fr: 'fr-FR',
      },
      defaultLocale: 'en',
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
