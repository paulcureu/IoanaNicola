/* Shared helpers for the site screens. */
const SiteUI = (() => {
  const label = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' };
  const wrap = { width: '100%', maxWidth: 1440, margin: '0 auto', padding: '0 var(--frame-margin)' };
  const pad = n => String(n).padStart(2, '0');
  const img = (base, key) => `${base}assets/projects/${key}.jpg`;
  const isPh = v => typeof v === 'string' && /^\[.*\]$/.test(v);
  function pagesLabel(p, c) {
    const [a, b] = p.pages;
    return a === b ? `${c.project.pageSingle} ${pad(a)}` : `${c.project.pages} ${pad(a)}–${pad(b)}`;
  }
  function Ph({ children }) {
    return <span title="De completat / to be completed" style={{ color: 'var(--fg-2)', borderBottom: '1px dashed var(--line-strong)', paddingBottom: 1 }}>{children}</span>;
  }
  function Val({ v }) { return isPh(v) ? <Ph>{v}</Ph> : <>{v}</>; }
  function Display({ children, size, as = 'h1', style }) {
    const Tag = as;
    return <Tag style={{ margin: 0, font: `var(--weight-light) ${size}/1.02 var(--font-sans)`, letterSpacing: '-.025em', color: 'var(--fg-1)', textWrap: 'balance', ...style }}>{children}</Tag>;
  }
  return { label, wrap, pad, img, isPh, pagesLabel, Ph, Val, Display };
})();

Object.assign(window, { SiteUI });
