import React from 'react';
import { Icon } from '../core/Icon.jsx';

/** Project tile for the index grid: cover image, number · discipline, title. */
export function ProjectCard({ href, onClick, image, number, title, discipline, aspect = '4 / 3', imagePosition = '50% 50%', badge, style }) {
  const [hover, setHover] = React.useState(false);
  const label = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' };
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 20, textDecoration: 'none', color: 'var(--fg-1)', ...style }}>
      <div style={{ overflow: 'hidden', aspectRatio: aspect, background: 'var(--surface-sunken)' }}>
        <img src={image} alt="" loading="lazy" draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imagePosition, display: 'block', transform: hover ? 'scale(1.03)' : 'scale(1)', transition: 'transform 1400ms var(--ease-out)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) auto', columnGap: 12, alignItems: 'baseline' }}>
        <span style={{ ...label, color: 'var(--fg-1)' }}>{number}</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ font: 'var(--weight-light) clamp(22px, 2vw, 28px)/1.15 var(--font-sans)', letterSpacing: '-.01em', textWrap: 'balance' }}>{title}</span>
          <span style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'baseline' }}>
            <span style={{ font: 'var(--text-caption)', color: 'var(--fg-2)' }}>{discipline}</span>
            {badge && <span style={{ ...label, fontSize: 10, whiteSpace: 'nowrap', padding: '4px 8px', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-pill)' }}>{badge}</span>}
          </span>
        </span>
        <Icon name="arrow-up-right" size={18} style={{ opacity: hover ? 1 : 0, transform: hover ? 'none' : 'translate(-4px, 4px)', transition: 'opacity var(--dur-base), transform var(--dur-base) var(--ease-out)' }} />
      </div>
    </a>
  );
}
