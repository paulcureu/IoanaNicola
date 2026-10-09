import React from 'react';

/* Spread s shows pages [2s, 2s+1]; page 1 (cover) sits alone on the right, like a bound book. */
const spreadOf = p => Math.floor(p / 2);

function Face({ src, side, alt }) {
  const shade = side === 'left'
    ? 'linear-gradient(to left, var(--book-gutter-shade), rgba(0,0,0,0) 6%)'
    : 'linear-gradient(to right, var(--book-gutter-shade), rgba(0,0,0,0) 6%)';
  if (!src) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--white)', overflow: 'hidden' }}>
      <img src={src} alt={alt} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }} />
      {side !== 'none' && <div style={{ position: 'absolute', inset: 0, background: shade, pointerEvents: 'none' }} />}
    </div>
  );
}

/**
 * Page-turning book for pre-rendered landscape pages.
 * Controlled via `page` + `onPageChange`, or uncontrolled.
 */
export function FlipBook({ pages = [], page, onPageChange, mode = 'spread', aspect = 842 / 595, keyboard = true, altPrefix = 'Pagina', style }) {
  const total = pages.length;
  const [inner, setInner] = React.useState(1);
  const current = page ?? inner;
  const unit = p => (mode === 'spread' ? spreadOf(p) : p);
  const [shown, setShown] = React.useState(unit(current));
  const [anim, setAnim] = React.useState(null); // {from,to,dir,go}
  const shownRef = React.useRef(shown);
  shownRef.current = shown;

  const src = n => (n >= 1 && n <= total ? pages[n - 1] : null);
  const L = s => (mode === 'spread' ? src(2 * s) : null);
  const R = s => (mode === 'spread' ? src(2 * s + 1) : src(s));
  const maxUnit = mode === 'spread' ? spreadOf(total) : total;
  const minUnit = mode === 'spread' ? 0 : 1;

  React.useEffect(() => { pages.forEach(u => { const i = new Image(); i.src = u; }); }, [pages.join('|')]);

  // target follows current page
  React.useEffect(() => {
    const to = unit(current);
    if (anim || to === shownRef.current) return;
    const dir = to > shownRef.current ? 1 : -1;
    setAnim({ from: shownRef.current, to, dir, go: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setAnim(a => (a ? { ...a, go: true } : a))));
  }, [current, mode, anim]);

  React.useEffect(() => { if (!anim) setShown(unit(current)); }, [mode]);

  const finish = () => { if (anim) { setShown(anim.to); setAnim(null); } };
  React.useEffect(() => { if (anim && anim.go) { const t = setTimeout(finish, 900); return () => clearTimeout(t); } }, [anim && anim.go]);

  const go = p => {
    const n = Math.max(1, Math.min(total, p));
    if (n === current) return;
    if (page === undefined) setInner(n);
    onPageChange && onPageChange(n);
  };
  const step = d => {
    if (anim) return;
    const u = unit(current) + d;
    if (u < minUnit || u > maxUnit) return;
    go(mode === 'spread' ? Math.max(1, 2 * u) : u);
  };
  React.useEffect(() => {
    if (!keyboard) return;
    const k = e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  const spread = mode === 'spread';
  const base = anim ? anim : null;
  const under = base
    ? (base.dir > 0 ? { l: L(base.from), r: R(base.to) } : { l: L(base.to), r: R(base.from) })
    : { l: L(shown), r: R(shown) };
  const target = anim ? anim.to : shown;
  const offset = spread ? (!L(target) ? '-25%' : !R(target) ? '25%' : '0%') : '0%';
  const alt = n => `${altPrefix} ${n}`;

  let leaf = null;
  if (base) {
    const next = base.dir > 0;
    const front = spread ? (next ? R(base.from) : L(base.from)) : R(base.from);
    const back = spread ? (next ? L(base.to) : R(base.to)) : null;
    const rot = base.go ? (next ? -180 : 180) : 0;
    leaf = (
      <div onTransitionEnd={e => { if (e.target === e.currentTarget) finish(); }} style={{
        position: 'absolute', top: 0, bottom: 0, width: spread ? '50%' : '100%',
        left: spread ? (next ? '50%' : 0) : 0,
        transformOrigin: spread ? (next ? 'left center' : 'right center') : 'left center',
        transformStyle: 'preserve-3d', transform: `rotateY(${rot}deg)`,
        transition: base.go ? 'transform var(--dur-page) var(--ease-page)' : 'none', zIndex: 3,
      }}>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          <Face src={front} side={spread ? (next ? 'right' : 'left') : 'none'} alt="" />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(${next ? 'to left' : 'to right'}, rgba(70,58,49,0), rgba(70,58,49,.18))`, opacity: base.go ? 1 : 0, transition: 'opacity var(--dur-page) var(--ease-page)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'var(--paper-1)' }}>
          {back && <Face src={back} side={next ? 'left' : 'right'} alt="" />}
        </div>
      </div>
    );
  }

  const ratio = spread ? aspect * 2 : aspect;
  const atStart = unit(current) <= minUnit, atEnd = unit(current) >= maxUnit;

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: String(ratio), perspective: '2600px', ...style }}>
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${offset})`, transition: 'transform var(--dur-page) var(--ease-page)', transformStyle: 'preserve-3d' }}>
        {spread ? (
          <>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', boxShadow: under.l ? 'var(--shadow-book)' : 'none' }}>
              <Face src={under.l} side="left" alt={alt(2 * (anim ? (anim.dir > 0 ? anim.from : anim.to) : shown))} />
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', boxShadow: under.r ? 'var(--shadow-book)' : 'none' }}>
              <Face src={under.r} side="right" alt={alt(2 * (anim ? (anim.dir > 0 ? anim.to : anim.from) : shown) + 1)} />
            </div>
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'var(--shadow-book)' }}>
            <Face src={anim ? R(anim.to) : R(shown)} side="none" alt={alt(anim ? anim.to : shown)} />
          </div>
        )}
        {leaf}
      </div>
      <button type="button" aria-label="previous" tabIndex={-1} onClick={() => step(-1)} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: 'transparent', border: 0, cursor: atStart ? 'default' : 'w-resize', zIndex: 4 }} />
      <button type="button" aria-label="next" tabIndex={-1} onClick={() => step(1)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', background: 'transparent', border: 0, cursor: atEnd ? 'default' : 'e-resize', zIndex: 4 }} />
    </div>
  );
}
