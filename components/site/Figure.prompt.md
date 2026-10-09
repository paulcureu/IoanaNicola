A project image with a quiet caption; click opens the full-screen Lightbox.

```jsx
<Figure src="assets/projects/01-sectiune-long.jpg" width={758} height={431}
  caption="Secțiune longitudinală" onOpen={() => openAt(3)} />
```

- Pass native `width`/`height` so the figure never upscales a low-res crop (it caps at 1.1×) and never exceeds 82vh tall.
- No frame, border or shadow: drawings sit directly on paper. Hover dims the image to 92% and darkens the caption.
