import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

const pad = n => String(n).padStart(2, '0');

function Row({ s, active, onSelect }) {
  const [hover, setHover] = React.useState(false);
  return (
    <li style={{ listStyle: 'none' }}>
      <button type="button" onClick={() => onSelect && onSelect(s.page)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        aria-current={active ? 'true' : undefined}
        style={{ width: '100%', display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) auto', alignItems: 'baseline', gap: 16, padding: '18px 0', background: 'transparent', border: 0, borderTop: '1px solid var(--line)', cursor: 'pointer', textAlign: 'left', color: 'var(--fg-1)' }}>
        <span style={{ font: 'var(--weight-medium) var(--size-label)/1 var(--font-sans)', letterSpacing: '.12em', color: active ? 'var(--fg-1)' : 'var(--fg-2)' }}>{s.number}</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4, transform: hover ? 'translateX(4px)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }}>
          <span style={{ font: `${active ? 'var(--weight-medium)' : 'var(--weight-regular)'} var(--size-body)/1.35 var(--font-sans)`, textWrap: 'pretty' }}>{s.title}</span>
          {s.subtitle && <span style={{ font: 'var(--text-caption)', color: 'var(--fg-2)', textWrap: 'pretty' }}>{s.subtitle}</span>}
        </span>
        <span style={{ font: 'var(--weight-regular) var(--size-caption)/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums', color: hover || active ? 'var(--fg-1)' : 'var(--fg-2)' }}>{pad(s.page)}</span>
      </button>
    </li>
  );
}

/** Contents list with jump-to-section. placement: inline | right (side panel) | bottom (mobile sheet). */
export function TableOfContents({ sections = [], currentPage, onSelect, title = 'Cuprins', open = true, onClose, closeLabel = 'Închide', placement = 'inline', style }) {
  const activeIdx = sections.reduce((acc, s, i) => (currentPage >= s.page ? i : acc), -1);
  const list = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, ...(placement === 'inline' ? style : null) }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 }}>
        <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' }}>{title}</span>
        {onClose && placement !== 'inline' && <IconButton icon="x" label={closeLabel} onClick={onClose} />}
      </div>
      <ol style={{ margin: 0, padding: 0, borderBottom: '1px solid var(--line)' }}>
        {sections.map((s, i) => <Row key={s.number} s={s} active={i === activeIdx} onSelect={onSelect} />)}
      </ol>
    </div>
  );
  if (placement === 'inline') return list;
  const bottom = placement === 'bottom';
  return (
    <div aria-hidden={!open} style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: open ? 'auto' : 'none', ...style }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'var(--surface-scrim)', opacity: open ? 1 : 0, transition: 'opacity var(--dur-slow) var(--ease-out)' }} />
      <aside role="dialog" aria-label={title} style={{
        position: 'absolute', background: 'var(--surface-page)', overflowY: 'auto',
        ...(bottom
          ? { left: 0, right: 0, bottom: 0, maxHeight: '82%', padding: '12px 20px 28px', boxShadow: 'var(--shadow-sheet)', transform: open ? 'none' : 'translateY(100%)' }
          : { top: 0, right: 0, bottom: 0, width: 'min(440px, 92vw)', padding: '24px 40px', borderLeft: '1px solid var(--line)', transform: open ? 'none' : 'translateX(100%)' }),
        transition: 'transform var(--dur-slow) var(--ease-out)',
      }}>
        {bottom && <div aria-hidden="true" style={{ width: 36, height: 3, background: 'var(--line-strong)', borderRadius: 2, margin: '0 auto 8px' }} />}
        {list}
      </aside>
    </div>
  );
}
