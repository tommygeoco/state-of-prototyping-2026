# Progress

- Investigated failing clipboard and new-tab PNG behavior.
- Confirmed CSP and client-side DOM rendering made the current approach unreliable.
- Started migration plan toward stable server-generated PNG URLs for chart sharing.
- Added `/social/png/[slug]` route that returns real `image/png` responses server-side.
- Replaced `ChartActions` PNG behavior so it opens the stable PNG URL directly.
- Verified the PNG route returns `200 OK` with `content-type: image/png` locally.

