# Public site SEO and discovery

The public website is generated static HTML served from the repository root by
GitHub Pages. `scripts/build-site.mjs` is the source of truth for pages,
metadata, structured data, crawler files, the web manifest, feeds, and
machine-readable product context.

## Metadata

Every canonical page includes:

- a page-specific title using the `Page | Wooolfmesh` template, with a distinct
  home-page title;
- a compact description, canonical URL, robots directive, author, creator,
  publisher, application name, theme color, and Apple web-app metadata;
- Open Graph URL, title, description, locale, and a 1200×630 PNG preview;
- Twitter/X summary-large-image metadata;
- favicon, PNG favicon, Apple touch icon, and web manifest links.

The metadata describes Wooolfmesh as a local execution workspace that remembers
work between sessions. Work Thread, recorded outcomes, decisions, sources and
the next move are the user-facing proof; Markdown ownership and optional AI
support that outcome. The app source is private, its root license is pending,
and this public website repository is not the app. No free-access promise,
Store availability, ratings,
reviews, certifications, awards, or user-count claims are made.

## Structured data

Canonical pages include `WebPage` and `BreadcrumbList` JSON-LD. The home page
also includes:

- `WebSite`;
- `SoftwareApplication`;
- `Person` for Dzmitry Kharlanau;
- `Project` for Wooolfmesh.

`FAQPage` is emitted only on `/faq/`, where the same questions and answers are
visible. Reusable JSON-LD documents are generated under `/schema/`.

## Crawlers and app discovery

- `/robots.txt` allows the public site, points to `/sitemap.xml`, and excludes
  repository/build internals.
- `/sitemap.xml` is generated deterministically from canonical, indexable pages.
- `/llms.txt` provides a concise product summary and canonical public links.
- `/llms-full.txt` provides expanded public product context.
- `/humans.txt` identifies the project and creator.
- `/site.webmanifest` references 192×192 and 512×512 regular and maskable icons.
- `/favicon.ico`, `/favicon.svg`, `/assets/icons/*`, and `/assets/og.png` are
  generated from existing Wooolfmesh brand artwork; no replacement logo is
  introduced.

## Validation

```bash
npm ci
npm run build
npm run validate
npm run format:check
npm run lint:html
python3 -m http.server 4173
npm run check:links
npm run check:a11y
```

`npm run validate` checks required output, canonical uniqueness, title
templates, one H1 per canonical page, metadata coverage, JSON-LD syntax/types,
manifest icon coverage and dimensions, the ICO header, sitemap coverage, and
local links.

The positioning guard also checks the shared definition across HTML, JSON and
LLM context, explicit beta/source status, request-access wording, illustrative
versus actual screenshots, and the absence of unsupported availability markup.

## Known limitations and manual follow-up

- Search-engine indexing is not immediate. Submit
  `https://wooolfmesh.github.io/sitemap.xml` in Google Search Console and Bing
  Webmaster Tools after the production deployment.
- Social platforms cache previews. Re-scrape the home URL in their sharing
  debuggers after deployment.
- Structured-data eligibility is controlled by search engines and does not
  guarantee a rich result.
- GitHub Pages does not provide per-route HTTP response headers from this
  repository, so crawler directives are expressed in page metadata and
  `robots.txt`.
