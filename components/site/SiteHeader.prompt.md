Sticky site header on paper: name + "FAU Cluj-Napoca" at left, tracked nav links + RO/EN at right; on phones a menu button opens a full-screen paper menu with large light links.

```jsx
<SiteHeader name="Bude Ioana Nicola" sub="FAU Cluj-Napoca"
  links={[{ label: 'Proiecte', href: '#/proiecte', active: true }, { label: 'Carte', href: '#/carte/1' }, { label: 'Despre', href: '#/despre' }]}
  lang={lang} onLangChange={setLang} compact={isPhone} />
```

- 72px tall (64 compact). A hairline appears once the page scrolls.
- Active link is underlined; no pills or colour fills.
