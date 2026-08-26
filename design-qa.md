# Design QA — Exact Electric Evidence Wall Reference

## Source visual truth

- User-provided reference: `/var/folders/7l/0b29717566jghtwgm8kj7gww0000gn/T/codex-clipboard-5a24808e-2ec0-4b12-95a3-d1611a3a083e.png`.
- Reference size: 864 x 1821 CSS pixels.
- Durable source crops: `wooolfmesh-exact-reference-top-864x1060.png` and `wooolfmesh-exact-reference-bottom-864x1060.png` in the current Codex visualization folder.
- Requested exception: preserve the original Wooolfmesh mascot from `assets/wooolfmesh.png`.

## Implementation evidence

- Local preview: `http://127.0.0.1:4173/`.
- Generated page: `index.html`.
- Owning source: `scripts/build-site.mjs`.
- Visual system: `assets/styles.css`.
- Exact desktop captures: `wooolfmesh-exact-qa-top-864x1060.png` and `wooolfmesh-exact-qa-bottom-864x1060.png`.
- Mobile capture: `wooolfmesh-exact-mobile-final-390x844.png`.
- Mobile-menu capture: `wooolfmesh-exact-mobile-menu-passed.png`.
- Same-size comparison composites: `wooolfmesh-exact-comparison-top.png` and `wooolfmesh-exact-comparison-bottom.png`.

The source and implementation were compared side by side at the same 864 px width. The top comparison covers the header, status rail, hero, trust panel, and product proof. The bottom comparison covers the proof continuation, evidence wall, closing strips, CTA, and footer.

## Fidelity findings

- P0: none.
- P1: none.
- P2: none.
- P3, accepted by request: the reference placeholder mark is replaced by the user's original Wooolfmesh mascot.
- P3, accepted for product truth: the product-proof frame uses the real current application screenshot rather than the concept's simulated UI. Its date and small labels therefore differ from the reference.
- P3, accepted: the implementation uses a clean white paper field while the raster reference contains subtle generated texture and noise.
- P3, accepted: the rendered page is 1818 px tall versus the 1821 px reference, a 3 px full-page difference with no section-level drift.

The implementation matches the defining reference geometry and hierarchy: the 95 px black rail, compact white header, three-line black/cyan/magenta headline, notched trust panel, framed product evidence, cyan Electric Evidence Wall with three extracted evidence cards, magenta proof strip, black closing CTA, and compact grouped footer.

## Iteration history

1. The first implementation was directionally similar but had P2 differences in header and rail placement, hero proportions, extra sections, and footer structure.
2. The homepage was rebuilt to match the reference section order and 864 x 1821 geometry.
3. A second comparison found P2 drift in the trust-panel position, proof caption visibility, evidence-wall height, and column alignment.
4. The grid, notch, proof caption, extracted evidence cards, stage positions, and full-page rhythm were corrected.
5. Mobile inspection found a P1 stacking fault where the open menu rendered beneath page content; the header stacking context was fixed.
6. Mobile inspection found P2 inherited borders inside trust rows; those borders were reset.
7. The final same-size comparison found no actionable P0, P1, or P2 differences.

## Responsive and interaction checks

- Desktop reference viewport: 864 x 1060 at device-pixel ratio 1 for each comparison crop.
- Mobile viewport: 390 x 844 with `scrollWidth == innerWidth == 390` and no horizontal overflow.
- Mobile menu opens and closes, updates `aria-expanded`, and changes its accessible label between `Open menu` and `Close menu`.
- The menu control is 44 x 44 px; primary mobile CTAs are 48 px high.
- The source-plan CTA reaches `/roadmap/#open-source-readiness` and presents the `ROADMAP` heading.
- The external private-beta CTA was inspected but not submitted because submission would create external GitHub state.
- The mascot, trust-icon strip, product proof, and all three evidence images loaded at valid intrinsic dimensions.
- The inspected desktop and mobile flows produced no browser console errors or warnings.

## Static checks

- `npm run check` passed after the final source changes: build, OG generation, formatting, site validation, HTML validation, metadata, JSON-LD, icons, sitemap, `llms.txt`, and local links across 97 required files.
- `git diff --check` passed.
- The local preview remains running for handoff.

final result: passed
