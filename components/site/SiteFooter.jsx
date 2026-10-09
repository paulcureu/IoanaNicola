import React from 'react';

/** Minimal footer: name + faculty, link row, copyright. */
export function SiteFooter({ name, note, links = [], rights, compact = false, style }) {
  const label = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' };
  return (
    <footer style={{ borderTop: '1px solid var(--line)', ...style }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: `${compact ? 32 : 48}px var(--frame-margin) ${compact ? 40 : 56}px`, display: 'grid', gridTemplateColumns: compact ? '1fr' : 'minmax(0,1fr) auto', gap: compact ? 24 : 40, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ font: 'var(--weight-regular) 15px/1.3 var(--font-sans)' }}>{name}</span>
          {note && <span style={{ font: 'var(--text-caption)', color: 'var(--fg-2)' }}>{note}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: compact ? 'flex-start' : 'flex-end' }}>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '4px 20px' : '4px 28px' }}>
            {links.map(l => (
              <a key={l.href + l.label} href={l.href} download={l.download} style={{ ...label, color: 'var(--fg-1)', textDecoration: 'none', padding: '10px 0' }}>{l.label}</a>
            ))}
          </nav>
          {rights && <span style={{ ...label, fontSize: 10 }}>{rights}</span>}
        </div>
      </div>
    </footer>
  );
}
