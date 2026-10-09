import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
import { LanguageToggle } from '../navigation/LanguageToggle.jsx';

const LABEL = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

function NavLink({ href, active, children, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} onClick={onClick} aria-current={active ? 'page' : undefined} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...LABEL, display: 'inline-flex', alignItems: 'center', height: 'var(--hit-min)', padding: '0 10px', textDecoration: 'none', color: active || hover ? 'var(--fg-1)' : 'var(--fg-2)' }}>
      <span style={{ paddingBottom: 4, borderBottom: active ? '1px solid currentColor' : '1px solid transparent' }}>{children}</span>
    </a>
  );
}

/** Site header: name (home link) left, nav + RO/EN right. compact = phone with full-screen menu. */
export function SiteHeader({ name, sub, homeHref = '#/', links = [], lang, onLangChange, compact = false, menuLabel = 'Meniu', closeLabel = 'Închide', menuFooter, style }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  React.useEffect(() => { if (!compact) setOpen(false); }, [compact]);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const k = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', k); };
  }, [open]);

  const h = compact ? 64 : 72;
  const brand = (
    <a href={homeHref} onClick={() => setOpen(false)} style={{ display: 'flex', flexDirection: 'column', gap: 5, textDecoration: 'none', color: 'var(--fg-1)' }}>
      <span style={{ font: 'var(--weight-regular) 15px/1 var(--font-sans)', letterSpacing: '.01em' }}>{name}</span>
      {sub && <span style={{ ...LABEL, fontSize: 10, color: 'var(--fg-2)' }}>{sub}</span>}
    </a>
  );
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--surface-page)', borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`, transition: 'border-color var(--dur-base)', ...style }}>
        <div style={{ height: h, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, maxWidth: 1440, margin: '0 auto', padding: '0 var(--frame-margin)' }}>
          {brand}
          {compact ? (
            <IconButton icon="menu" label={menuLabel} onClick={() => setOpen(true)} style={{ marginRight: -10 }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <nav style={{ display: 'flex', gap: 8 }}>{links.map(l => <NavLink key={l.href} {...l}>{l.label}</NavLink>)}</nav>
              {onLangChange && <><span aria-hidden="true" style={{ width: 1, height: 18, background: 'var(--line-strong)', margin: '0 12px' }} /><LanguageToggle value={lang} onChange={onLangChange} /></>}
            </div>
          )}
        </div>
      </header>
      {compact && (
        <div aria-hidden={!open} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'var(--surface-page)', display: 'grid', gridTemplateRows: `${h}px 1fr auto`, padding: '0 var(--frame-margin) calc(24px + env(safe-area-inset-bottom))', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-slow) var(--ease-out)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {brand}
            <IconButton icon="x" label={closeLabel} onClick={() => setOpen(false)} style={{ marginRight: -10 }} />
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid var(--line)' }}>
            {links.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={l.active ? 'page' : undefined}
                style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'var(--fg-1)', transform: open ? 'none' : 'translateY(12px)', transition: `transform var(--dur-slow) var(--ease-out) ${60 * i}ms` }}>
                <span style={{ ...LABEL, color: 'var(--fg-2)', width: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ font: `${l.active ? 'var(--weight-regular)' : 'var(--weight-light)'} 40px/1.1 var(--font-sans)`, letterSpacing: '-.015em' }}>{l.label}</span>
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 16 }}>
            {onLangChange && <LanguageToggle value={lang} onChange={onLangChange} style={{ marginLeft: -6 }} />}
            {menuFooter}
          </div>
        </div>
      )}
    </>
  );
}
