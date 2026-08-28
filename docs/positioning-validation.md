# Work-first public positioning — 29 August 2026

Wooolfmesh is a local execution workspace that remembers your work between
sessions. The site now consistently leads with recorded outcome, decisions,
sources and next move; local Markdown ownership and optional AI explain how.

## Boundaries

- Application source remains private; this public repository is the website.
- Root application license and public release remain pending. No free-access,
  Store-ready, automated-writing or measured productivity claim is made.
- Request beta access opens a public GitHub issue and does not guarantee access.
  Support warns against sharing private work or security details publicly.
- Historical release notes and legacy URLs remain. Research pages/data label
  their Studio proposals as dated research, not the current product contract.
- The original mascot, poster composition and illustration assets remain.
  Illustrative fragments are not presented as actual app screenshots.

## Authored and generated files

`scripts/build-site.mjs` owns product copy, HTML, metadata, JSON, JSON-LD,
manifest, feeds and LLM context. `llms.txt` now regenerates on every build;
its former create-only path retained a conflicting old definition.
`scripts/patch-research.mjs` preserves the research links and dates.
`scripts/generate-og.mjs` owns the existing branded social card.

`assets/styles.css` changes only text contrast and content sizing: longer
captions wrap, the real screenshot is visible in full, and mobile illustration
rows and access notices grow with their content.

## Actual screenshot

`assets/screenshots/resume-handoff.png` is a direct 1280×820 capture of the
local app after a real Focus closeout, using fictional data in a temporary
vault. The task is **Verify the offline import**; the first fixture passed and
the second is unchecked. The recorded decision and next move are visible.
The app explicitly labels the Focus record as not independently verified.
The capture ends above developer chrome; no product content is edited.
This proves the UI state, not human adoption or speed improvement.

## Checks

- `npm run check`: generation, formatting, 97-file metadata/JSON-LD/sitemap/icon
  and local-target validation, and HTML lint.
- `npm run check:a11y`: seven configured URLs pass using installed Chrome via
  `PUPPETEER_EXECUTABLE_PATH`; cached Puppeteer Chrome lacked its framework.
- `linkinator . --recurse --skip '^(https://|mailto:)'`: 70 links pass via the
  checker's built-in server. URL crawling against Python's preview server had
  intermittent `ECONNRESET`; HTTP failures were not ignored.
- Browser: desktop and 390×844 mobile, menu and source-status navigation,
  metadata, original identity, full product image and social card reviewed.
  Mobile document width is 390 px; each illustrated row contains its text/image.
- `git diff --check` and source/generated readback.

Live Pages configuration was read as branch publishing from `main:/`. After
merge, verify the managed Pages workflow SHA and live HTML/image hashes.
Repository visibility, licensing and Pages configuration are not changed.
