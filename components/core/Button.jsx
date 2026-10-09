import React from 'react';
import { Icon } from './Icon.jsx';

/** Text button. primary = filled brown, outline = hairline, text = underlined link-style; inverse / outline-inverse for dark grounds. */
export function Button({ children, variant = 'outline', icon, iconAfter, onClick, href, download, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = {
    primary: { bg: 'var(--brown-900)', bgH: 'var(--brown-800)', fg: 'var(--fg-inverse)', bd: 'var(--brown-900)' },
    outline: { bg: 'transparent', bgH: 'var(--surface-hover)', fg: 'var(--fg-1)', bd: 'var(--line-strong)' },
    text: { bg: 'transparent', bgH: 'transparent', fg: 'var(--fg-1)', bd: 'transparent' },
    inverse: { bg: 'var(--paper-0)', bgH: 'var(--sand-100)', fg: 'var(--fg-1)', bd: 'var(--paper-0)' },
    'outline-inverse': { bg: 'transparent', bgH: 'rgba(251,250,247,.12)', fg: 'var(--fg-inverse)', bd: 'rgba(251,250,247,.6)' },
  }[variant] || {};
  const isText = variant === 'text';
  const s = {
    display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: isText ? 32 : 'var(--hit-min)',
    padding: isText ? '4px 0' : '0 22px', borderRadius: 'var(--radius-1)', border: `1px solid ${v.bd}`,
    background: hover && !disabled ? v.bgH : v.bg, color: hover && isText ? 'var(--accent-strong)' : v.fg,
    font: 'var(--weight-medium) 12px/1 var(--font-sans)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
    textDecoration: 'none', whiteSpace: 'nowrap', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
    transform: press && !disabled && !isText ? 'translateY(1px)' : 'none',
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast)', ...style,
  };
  const h = { onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setPress(false); }, onMouseDown: () => setPress(true), onMouseUp: () => setPress(false) };
  const inner = (
    <>
      {icon && <Icon name={icon} size={16} />}
      <span style={isText ? { borderBottom: '1px solid currentColor', paddingBottom: 3 } : null}>{children}</span>
      {iconAfter && <Icon name={iconAfter} size={16} style={{ transition: 'transform var(--dur-base) var(--ease-out)', transform: hover ? 'translateX(3px)' : 'none' }} />}
    </>
  );
  if (href && !disabled) return <a href={href} download={download} style={s} {...h}>{inner}</a>;
  return <button type="button" onClick={disabled ? undefined : onClick} disabled={disabled} style={s} {...h}>{inner}</button>;
}
