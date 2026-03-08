# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production (also runs pagefind indexing via postbuild)
npm run preview   # Preview production build locally
npm run check     # Run Astro type checking
npm run format    # Format all files with Prettier
npx astro sync    # Generate types based on src/content/config.ts
```

Note: `build` runs `astro build` followed by `pagefind --site dist` (search indexing). Search only works after a full build. Use `npm run preview` to test search locally.

## Architecture

This is a personal blog/portfolio site built on the [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) theme.

### Key configuration files
- `src/site.config.ts` — Site metadata (author, title, nav links via `menuLinks`). Edit here to change site identity or navigation.
- `src/content/config.ts` — Zod schema for blog posts (required fields: `title`, `description`, `publishDate`; optional: `tags`, `draft`, `coverImage`, `ogImage`, `updatedDate`).
- `astro.config.ts` — Astro integrations (MDX, Tailwind, Sitemap), markdown plugins (reading time, external links), Satori font loading via custom Vite plugin.

### Path aliases (defined in `tsconfig.json`)
| Alias | Resolves to |
|---|---|
| `@/components/*` | `src/components/*.astro` |
| `@/layouts/*` | `src/layouts/*.astro` |
| `@/utils` | `src/utils/index.ts` |
| `@/types` | `src/types.ts` |
| `@/site-config` | `src/site.config.ts` |
| `@/assets/*` | `src/assets/*` |

### Content & routing
- Blog posts live in `src/content/post/` as `.md` or `.mdx` files (or `index.md`/`index.mdx` inside a folder for posts with co-located assets).
- Draft posts (`draft: true` in frontmatter) are visible in dev but excluded from production builds.
- File-based routing under `src/pages/`: `posts/[slug].astro` (individual post), `posts/[...page].astro` (paginated list), `tags/` (tag browsing), `rss.xml.ts` (RSS feed).
- OG images are dynamically generated via Satori at `src/pages/og-image/[slug].png.ts` using fonts from `src/assets/`.

### Post frontmatter
| Field | Required | Notes |
|---|---|---|
| `title` | yes | Max 60 chars |
| `description` | yes | 50–160 chars, used for SEO |
| `publishDate` | yes | Sorting uses `updatedDate` if present, else `publishDate` |
| `updatedDate` | no | Changes sort order to this date |
| `tags` | no | Lowercase, deduplicated; auto-generates tag pages |
| `coverImage` | no | Object with `src` and `alt` |
| `ogImage` | no | Provide a path to skip auto-generation via Satori |
| `draft` | no | Defaults to `false`; `true` hides from prod builds |

### Analytics
To add analytics, insert a snippet in `src/layouts/Base.astro` or `src/components/BaseHead.astro`.

### Utility functions (`src/utils/`)
- `post.ts` — `getAllPosts()` (filters drafts in prod), `sortMDByDate()`, tag helpers
- `generateToc.ts` — Table of contents generation for blog posts
- `date.ts` — Date formatting using `siteConfig.date` locale settings
- `webmentions.ts` — Webmention fetching (optional feature, enable via `siteConfig.webmentions`)
