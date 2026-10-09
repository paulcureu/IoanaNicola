Phone viewer: one landscape page per screen, swiped horizontally with native scroll-snap (no flip effect on mobile).

```jsx
<SwipeViewer pages={pages} page={page} onPageChange={setPage} />
```

- Uses the browser's own momentum + snap, so it feels native and supports pinch-zoom of the page.
- Controlled `page` scrolls smoothly (used by the contents sheet and arrows).
- Neighbouring ±2 pages load eagerly, the rest lazily.
