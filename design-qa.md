# Design QA

## Source

- Selected concept: displayed Product Design option 2
- Reference: `/Users/dzmitryikharlanau/.codex/generated_images/01a0284a-39ad-7b11-8b49-3b8655804815/exec-26e30068-3355-470c-abfd-5c365f96e10c.png`
- Reference size: 1024 x 1536
- Primary product image: `assets/screenshots/resume-handoff.png`

## Implementation

- Generated page: `index.html`
- Source: `scripts/build-site.mjs`
- Styles: `assets/styles.css`
- Intended checks: desktop, tablet, 390 px mobile, navigation, primary CTAs, keyboard focus, console errors

## Static checks

- Site generator completed.
- Site metadata and local-link validation passed for 97 required files.
- Prettier check passed.
- HTML validation passed.
- Research pages and navigation were preserved from the updated `origin/main`.

## Rendered checks

- Inspected the built site in the Codex in-app browser through an isolated
  preview on `127.0.0.1:4174`; the existing process on port 4173 was left
  untouched.
- Desktop inspection completed at 1024 x 900 and mobile inspection at
  390 x 844.
- The mobile layout has no horizontal overflow (`innerWidth: 390`,
  `scrollWidth: 375`), and both the paper texture and product screenshot load
  at their intrinsic dimensions.
- The mobile menu opens and exposes the primary navigation. The Product link
  reaches `/product/`, and the source-plan CTA reaches the visible
  `/roadmap/#open-source-readiness` section.
- The inspected flows produced no browser console errors or warnings.
- Linkinator successfully crawled 65 local links.
- Pa11y CI passed 7/7 representative URLs at WCAG 2 AA with zero errors.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: the external private-beta CTA was not submitted because it opens a new
  GitHub issue; creating external state was outside the QA scope.

final result: passed
