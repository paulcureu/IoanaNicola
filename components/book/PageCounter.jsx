import React from 'react';

const pad = n => String(n).padStart(2, '0');

/** "03 / 15" — tabular page indicator. Pass `range` for spreads ("02–03 / 15"). */
export function PageCounter({ page, total, range, inverse = false, style }) {
  const cur = range && range[0] && range[1] ? `${pad(range[0])}–${pad(range[1])}` : pad(page);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, minWidth: 64, justifyContent: 'center', font: 'var(--weight-regular) var(--size-caption)/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums', letterSpacing: '.06em', color: inverse ? 'var(--fg-inverse)' : 'var(--fg-1)', ...style }}>
      <span>{cur}</span>
      <span style={{ color: inverse ? 'rgba(251,250,247,.6)' : 'var(--fg-2)' }}>/</span>
      <span style={{ color: inverse ? 'rgba(251,250,247,.6)' : 'var(--fg-2)' }}>{pad(total)}</span>
    </span>
  );
}
