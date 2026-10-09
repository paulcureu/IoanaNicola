import React from 'react';

/** RO / EN switch — two quiet text tabs, current one underlined. */
export function LanguageToggle({ value = 'ro', onChange, options = ['ro', 'en'], inverse = false, style }) {
  return (
    <div role="group" aria-label="Limba / Language" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, ...style }}>
      {options.map(o => {
        const on = o === value;
        return (
          <button key={o} type="button" aria-pressed={on} onClick={() => onChange && onChange(o)}
            style={{ minWidth: 36, height: 'var(--hit-min)', padding: '0 6px', background: 'transparent', border: 0, cursor: 'pointer',
              font: 'var(--weight-medium) var(--size-label)/1 var(--font-sans)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
              color: inverse ? (on ? 'var(--fg-inverse)' : 'rgba(251,250,247,.6)') : (on ? 'var(--fg-1)' : 'var(--fg-2)') }}>
            <span style={{ paddingBottom: 4, borderBottom: on ? '1px solid currentColor' : '1px solid transparent' }}>{o}</span>
          </button>
        );
      })}
    </div>
  );
}
