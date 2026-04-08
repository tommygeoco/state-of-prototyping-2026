# Findings

- Existing chart share buttons live in `components/charts/ChartActions.tsx`.
- Explore-page chart cards are keyed by `anchorId` values in `app/explore/page.tsx`.
- Existing square share card pages already exist at `app/social/[slug]/page.tsx`.
- Current social share slugs are: `hero`, `tools`, `vibe-by-role`, `ic-vs-de`, `outlook`, `distribution`, `satisfaction`, `satisfaction-delta`.
- The most reliable path is to generate PNGs from those existing social pages/routes on the server instead of screenshotting DOM in the client.
- The implemented stable path is `app/social/png/[slug]/route.tsx` using `ImageResponse` in `nodejs` runtime.
- `next/og` is strict about mixed text/expression children inside some elements; plain string interpolation is safer than adjacent JSX text nodes there.
- Browser-side `html-to-image` was blocked by CSP and produced unreliable clipboard/tab behavior, so it was removed from the PNG action path entirely.

