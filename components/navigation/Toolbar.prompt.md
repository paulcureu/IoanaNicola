The single row of viewer controls under the book: prev · counter · next | contents · fullscreen · download | RO/EN.

```jsx
<Toolbar page={page} total={15} range={[2,3]} onPrev={prev} onNext={next}
  canPrev={page > 1} canNext={page < 15}
  onContents={() => setToc(true)} onFullscreen={toggleFs}
  downloadHref="assets/portofoliu-bude-ioana-nicola.pdf"
  lang={lang} onLangChange={setLang} labels={copy[lang].toolbar} />
```

- Any action whose handler is omitted is hidden.
- `compact` for phones (drops fullscreen — iOS Safari doesn't support it for elements).
- `inverse` for the dark fullscreen stage.
