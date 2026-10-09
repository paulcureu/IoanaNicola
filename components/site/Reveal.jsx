import React from 'react';

/** Fades + rises its children in once they scroll into view. Honours reduced motion. */
export function Reveal({ children, delay = 0, y = 24, duration = 900, once = true, disabled = false, as = 'div', style }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(disabled);
  React.useEffect(() => {
    if (disabled) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); if (once) io.disconnect(); }
      else if (!once) setShown(false);
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, [disabled, once]);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0, transform: shown ? 'none' : `translateY(${y}px)`,
      transition: `opacity ${duration}ms var(--ease-out) ${delay}ms, transform ${duration}ms var(--ease-out) ${delay}ms`,
      ...style,
    }}>{children}</Tag>
  );
}
