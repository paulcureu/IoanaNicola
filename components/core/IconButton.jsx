import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = { sm: 36, md: 44 };

/** Round, borderless icon button. Renders <a> when href is set. */
export function IconButton({ icon, label, onClick, href, download, variant = 'ghost', size = 'md', disabled = false, active = false, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const d = SIZES[size] || SIZES.md;
  const inverse = variant === 'inverse';
  let bg = 'transparent';
  if (active) bg = inverse ? 'rgba(251,250,247,.16)' : 'var(--surface-hover)';
  if (hover && !disabled) bg = inverse ? 'rgba(251,250,247,.12)' : 'var(--surface-hover)';
  if (press && !disabled) bg = inverse ? 'rgba(251,250,247,.22)' : 'var(--surface-press)';
  const s = {
    width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 'var(--radius-pill)', border: variant === 'outline' ? '1px solid var(--line-strong)' : '1px solid transparent',
    background: bg, color: inverse ? 'var(--fg-inverse)' : 'var(--fg-1)', cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.32 : 1, padding: 0, textDecoration: 'none',
    transition: 'background var(--dur-fast) var(--ease-out), opacity var(--dur-fast)', flex: 'none', ...style,
  };
  const handlers = {
    onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true), onMouseUp: () => setPress(false),
    'aria-label': label, title: label,
  };
  const glyph = <Icon name={icon} size={size === 'sm' ? 18 : 20} />;
  if (href && !disabled) {
    return <a href={href} download={download} style={s} {...handlers}>{glyph}</a>;
  }
  return <button type="button" onClick={disabled ? undefined : onClick} disabled={disabled} aria-pressed={active || undefined} style={s} {...handlers}>{glyph}</button>;
}
