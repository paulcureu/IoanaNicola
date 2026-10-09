Discreet scroll animation: fade + 24px rise over 900ms, once, when the element enters the viewport.

```jsx
<Reveal delay={120} style={{ gridColumn: '8 / span 5' }}>
  <ProjectCard … />
</Reveal>
```

- The only scroll effect in the system. No parallax, no scale, no stagger longer than ~240ms.
- `disabled` renders statically (wired to the "Scroll animations" tweak); reduced-motion users get static content automatically.
