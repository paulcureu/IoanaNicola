Thin-stroke Lucide icon loaded from CDN; use for every glyph in the viewer chrome (never emoji or unicode arrows).

```jsx
<Icon name="arrow-right" />
<Icon name="download" size={18} />
```

- `name`: Lucide kebab-case name. Icons used by the system: `arrow-left`, `arrow-right`, `list`, `maximize`, `minimize`, `download`, `x`.
- `strokeWidth` defaults to 1.25 (Lucide ships 2) to match hairline borders.
- Inherits `currentColor`.
