Desktop page-turning book: shows two landscape pages per spread with a 3D leaf turn around the spine; the cover and back sit alone, centred.

```jsx
const pages = Array.from({ length: 15 }, (_, i) => `assets/pages/page-${String(i + 1).padStart(2, '0')}.jpg`);
<FlipBook pages={pages} page={page} onPageChange={setPage} />
```

- Width fills its container; height follows `aspect × 2` (spread) — size the parent with `min(100%, (100vh − chrome) × 2.83)`.
- Jumping several pages (contents) animates a single leaf straight to the target.
- Click left/right half or ←/→ to turn. 800ms, `--ease-page`; honours reduced motion.
- `mode="single"` for narrow desktops/tablets; use `SwipeViewer` on phones.
