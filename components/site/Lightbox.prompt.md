Full-screen gallery for a project's images: brown-900 ground, image contained on white, counter, caption, prev/next.

```jsx
<Lightbox items={all.map(i => ({ src: i.src, caption: i.caption }))}
  index={lb} open={lb >= 0} onClose={() => setLb(-1)} labels={copy.lightbox} />
```

- Keys: ← → to step (captured so the flip-book's arrows don't fire), Esc to close. Touch: swipe ≥48px.
- Click the dark margin to close. Body scroll is locked while open.
- 480ms fade in; images cross-fade at 240ms.
