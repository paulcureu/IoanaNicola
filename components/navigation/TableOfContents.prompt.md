Contents list for sections 01–05; each row jumps the book to the section's first page. Inline, as a right-hand panel, or a mobile bottom sheet.

```jsx
<TableOfContents sections={sections} currentPage={page}
  onSelect={p => { setPage(p); setToc(false); }}
  placement="right" open={toc} onClose={() => setToc(false)} title="Cuprins" />
```

- Rows: tracked number · title + subtitle · zero-padded page. Hairline rules, no cards.
- The section containing `currentPage` is set in medium weight.
- Section data for this portfolio lives in `ui_kits/portfolio-site/data.js`.
