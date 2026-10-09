Round, borderless icon-only control for the viewer chrome (prev/next, contents, fullscreen, download).

```jsx
<IconButton icon="arrow-right" label="Înainte / Next" onClick={next} />
<IconButton icon="download" label="Descarcă PDF" href="assets/portofoliu.pdf" download />
```

- `variant`: `ghost` default; `outline` for the large page arrows; `inverse` on dark fullscreen.
- `size="md"` (44px) everywhere touch is possible; `sm` (36px) only in dense desktop rows.
- `disabled` fades to 32% — used on first/last page.
