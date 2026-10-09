import React from 'react';
import { Icon } from '../core/Icon.jsx';

function Side({ item, label, dir, compact }) {
  const [hover, setHover] = React.useState(false);
  if (!item) return <span />;
  const next = dir > 0;
  return (
    <a href={item.href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 16, alignItems: next ? 'flex-end' : 'flex-start', textAlign: next ? 'right' : 'left', textDecoration: 'none', color: 'var(--fg-1)', padding: compact ? '24px 0' : '40px 0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: next ? 'row-reverse' : 'row', font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
        <Icon name={next ? 'arrow-right' : 'arrow-left'} size={16} style={{ transform: hover ? `translateX(${next ? 4 : -4}px)` : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }} />
        {label}
      </span>
      <span style={{ display: 'flex', gap: 14, alignItems: 'baseline', flexDirection: next ? 'row-reverse' : 'row' }}>
        <span style={{ font: 'var(--text-label)', letterSpacing: '.12em', color: 'var(--fg-1)' }}>{item.number}</span>
        <span style={{ font: `var(--weight-light) ${compact ? '20px' : 'clamp(24px, 2.6vw, 36px)'}/1.15 var(--font-sans)`, letterSpacing: '-.01em', textDecoration: hover ? 'underline' : 'none', textDecorationThickness: '1px', textUnderlineOffset: 6, textWrap: 'balance' }}>{item.title}</span>
      </span>
    </a>
  );
}

/** Previous / next project at the foot of a project page. */
export function ProjectPager({ prev, next, prevLabel = 'Proiectul anterior', nextLabel = 'Proiectul următor', compact = false, style }) {
  return (
    <nav aria-label="Proiecte" style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', borderTop: '1px solid var(--line)', ...style }}>
      <Side item={prev} label={prevLabel} dir={-1} compact={compact} />
      <div style={compact ? { borderTop: '1px solid var(--line)' } : { borderLeft: '1px solid var(--line)' }}>
        <Side item={next} label={nextLabel} dir={1} compact={compact} />
      </div>
    </nav>
  );
}
