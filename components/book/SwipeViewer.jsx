import React from 'react';

/** Mobile viewer: one page per screen, native horizontal swipe with scroll-snap. */
export function SwipeViewer({ pages = [], page, onPageChange, aspect = 842 / 595, gap = 16, altPrefix = 'Pagina', style }) {
  const ref = React.useRef(null);
  const [inner, setInner] = React.useState(1);
  const current = page ?? inner;
  const lastReported = React.useRef(current);
  const settle = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = (current - 1) * el.clientWidth;
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || current === lastReported.current) return;
    lastReported.current = current;
    el.scrollTo({ left: (current - 1) * el.clientWidth, behavior: 'smooth' });
  }, [current]);

  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const n = Math.round(el.scrollLeft / el.clientWidth) + 1;
      if (n !== lastReported.current) {
        lastReported.current = n;
        if (page === undefined) setInner(n);
        onPageChange && onPageChange(n);
      }
    }, 90);
  };

  return (
    <div ref={ref} onScroll={onScroll} style={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', width: '100%', overscrollBehaviorX: 'contain', ...style }}>
      {pages.map((u, i) => (
        <div key={u} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', scrollSnapStop: 'always', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `0 ${gap}px` }}>
          <img src={u} alt={`${altPrefix} ${i + 1}`} loading={Math.abs(i + 1 - current) <= 2 ? 'eager' : 'lazy'} draggable={false}
            style={{ width: '100%', aspectRatio: String(aspect), objectFit: 'cover', display: 'block', background: 'var(--white)', boxShadow: 'var(--shadow-book)' }} />
        </div>
      ))}
    </div>
  );
}
