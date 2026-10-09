import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
import { PageCounter } from '../book/PageCounter.jsx';

/** Full-screen image gallery: dark ground, contained image, caption, ←/→/Esc, swipe. */
export function Lightbox({ items = [], index = 0, open = false, onClose, onIndexChange, labels, style }) {
  const t = { close: 'Închide', prev: 'Imaginea anterioară', next: 'Imaginea următoare', ...labels };
  const [i, setI] = React.useState(index);
  const [vis, setVis] = React.useState(false);
  const [loaded, setLoaded] = React.useState('');
  const touch = React.useRef(null);
  const n = items.length;

  React.useEffect(() => { if (open) setI(index); }, [index, open]);
  React.useEffect(() => {
    if (!open) { setVis(false); return; }
    const r = requestAnimationFrame(() => setVis(true));
    return () => cancelAnimationFrame(r);
  }, [open]);

  const go = d => { if (!n) return; const k = (i + d + n) % n; setI(k); onIndexChange && onIndexChange(k); };

  React.useEffect(() => {
    if (!open) return;
    const k = e => {
      if (e.key === 'Escape') onClose && onClose();
      else if (e.key === 'ArrowRight') { e.stopPropagation(); go(1); }
      else if (e.key === 'ArrowLeft') { e.stopPropagation(); go(-1); }
    };
    window.addEventListener('keydown', k, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k, true); document.body.style.overflow = prev; };
  });

  if (!open || !n) return null;
  const it = items[Math.min(i, n - 1)];
  return (
    <div role="dialog" aria-modal="true" aria-label={it.caption}
      onTouchStart={e => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={e => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; touch.current = null; if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1); }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--brown-900)', color: 'var(--fg-inverse)', display: 'grid', gridTemplateRows: '64px minmax(0,1fr) auto', opacity: vis ? 1 : 0, transition: 'opacity var(--dur-slow) var(--ease-out)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(8px, 2vw, 24px) 0 clamp(16px, 3vw, 40px)' }}>
        <PageCounter page={i + 1} total={n} inverse style={{ justifyContent: 'flex-start' }} />
        <IconButton icon="x" label={t.close} onClick={onClose} variant="inverse" />
      </div>
      <div onClick={e => { if (e.target === e.currentTarget) onClose && onClose(); }}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 clamp(12px, 6vw, 96px)', minHeight: 0 }}>
        <img key={it.src} src={it.src} alt={it.caption || ''} onLoad={() => setLoaded(it.src)} draggable={false}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', background: '#fff', opacity: loaded === it.src ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)', userSelect: 'none' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, minHeight: 80, padding: '8px clamp(8px, 2vw, 24px) calc(8px + env(safe-area-inset-bottom)) clamp(16px, 3vw, 40px)' }}>
        <span style={{ font: 'var(--weight-light) 15px/1.4 var(--font-sans)', color: 'var(--fg-inverse)', textWrap: 'pretty' }}>{it.caption}</span>
        {n > 1 && (
          <span style={{ display: 'flex', gap: 4, flex: 'none' }}>
            <IconButton icon="arrow-left" label={t.prev} onClick={() => go(-1)} variant="inverse" />
            <IconButton icon="arrow-right" label={t.next} onClick={() => go(1)} variant="inverse" />
          </span>
        )}
      </div>
    </div>
  );
}
