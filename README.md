# Astro 6 + Starlight Reset Repro

Minimal reproduction for a style leak where Starlight reset CSS appears on non-doc routes.

## Stack

- Astro `6.1.0`
- `@astrojs/starlight` `0.38.2`
- `@astrojs/cloudflare` `13.1.4`
- Tailwind CSS v4 via `@tailwindcss/vite`
- `@astrojs/starlight-tailwind`

## Routes

- `/` is a regular Astro page using a custom layout and Tailwind website CSS.
- `/docs/` is a Starlight page.

## Repro

```bash
bun install
bun run dev
```

Open:

- `http://localhost:4321/`
- `http://localhost:4321/docs/`

## What To Check

On `/`, the "Plain H1 on the website route" block prints computed styles.

Expected on `/`:

- browser-default heading and paragraph margins
- website font family from `src/styles/site.css`
- no Starlight body reset

Unexpected behavior being reproduced:

- heading and paragraph margins become `0px`
- body font/background shift to Starlight values even though the page is not a docs route

## Files

- `src/pages/index.astro`: marketing page
- `src/styles/site.css`: website Tailwind CSS
- `src/content/docs/docs/index.mdx`: docs route at `/docs/`
- `src/styles/docs.css`: Starlight Tailwind CSS
- `astro.config.mjs`: Cloudflare adapter + Starlight + Tailwind config
