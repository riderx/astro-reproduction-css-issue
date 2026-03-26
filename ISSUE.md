# Bug: Starlight reset CSS leaks from `/docs` into non-Starlight routes on Astro 6

## Summary

In this minimal Astro 6 project, Starlight is only used for the `/docs` section, but its global reset styles appear to affect the regular website route at `/`.

## Environment

- Astro `6.1.0`
- `@astrojs/starlight` `0.38.2`
- `@astrojs/cloudflare` `13.1.4`
- Tailwind CSS v4 with `@tailwindcss/vite`
- `@astrojs/starlight-tailwind`

## Reproduction

1. `bun install`
2. `bun run dev`
3. Open `/`
4. Open `/docs/`
5. Return to `/` and inspect the debug block

## Expected

Only `/docs/*` should receive the Starlight reset and base styles.

## Actual

The marketing page at `/` picks up reset-like behavior from Starlight:

- heading and paragraph margins collapse to `0px`
- body styles look like Starlight rather than the site layout styles

## Notes

- The home page uses a separate Astro layout and website stylesheet.
- Starlight only powers the docs content under `src/content/docs/docs/*`.
- The project uses the Cloudflare adapter because the original app that exposed the issue also does.
