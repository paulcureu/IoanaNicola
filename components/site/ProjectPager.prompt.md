Previous / next project navigation, two halves split by a hairline (stacked on phones).

```jsx
<ProjectPager prev={{ href: '#/proiecte/moigrad', number: '01', title: 'Moigrad Porolissum' }}
  next={{ href: '#/proiecte/ambient', number: '03', title: 'Colecții' }} />
```

- Hover: arrow nudges 4px outward, title gets a 1px underline.
- Wraps around (05 → 01) at the call site.
