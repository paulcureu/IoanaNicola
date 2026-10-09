const SDS = window.BudeIoanaNicolaPortofoliuDS_69cab2;

function StartScreen({ lang, setLang, onOpen, mobile, base }) {
  const { Button, LanguageToggle } = SDS;
  const P = window.PORTFOLIO, c = P.copy[lang];
  const [hover, setHover] = React.useState(false);
  const cover = (
    <button type="button" onClick={() => onOpen(1)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label={c.open}
      style={{ padding: 0, border: 0, background: 'transparent', cursor: 'pointer', width: '100%', display: 'block', transform: hover ? 'translateY(-4px)' : 'none', transition: 'transform var(--dur-slow) var(--ease-out)' }}>
      <img src={P.pages(base)[0]} alt={c.kicker} style={{ width: '100%', aspectRatio: String(P.aspect), display: 'block', objectFit: 'cover', boxShadow: 'var(--shadow-book)', background: '#fff' }} />
    </button>
  );
  const label = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' };
  const text = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 20 : 28, maxWidth: 560 }}>
      <div style={label}>{c.kicker} · {c.year}</div>
      <h1 style={{ margin: 0, font: `var(--weight-light) ${mobile ? 'clamp(40px, 12vw, 52px)' : 'clamp(48px, 5.6vw, 84px)'}/1.04 var(--font-sans)`, letterSpacing: 'var(--tracking-display)', color: 'var(--fg-1)', textWrap: 'balance' }}>{P.name}</h1>
      <p style={{ margin: 0, font: `var(--weight-light) ${mobile ? 16 : 18}px/1.5 var(--font-sans)`, color: 'var(--fg-2)' }}>{c.faculty}<br />{c.city}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: mobile ? 4 : 12, flexDirection: mobile ? 'column' : 'row' }}>
        <Button variant="primary" iconAfter="arrow-right" onClick={() => onOpen(1)} style={mobile ? { justifyContent: 'space-between' } : null}>{c.open}</Button>
        <Button icon="download" href={base + P.pdf} download={P.pdfName} style={mobile ? { justifyContent: 'center' } : null}>{c.download}</Button>
      </div>
    </div>
  );
  return (
    <div data-screen-label="Start" style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr', padding: `0 var(--frame-margin)`, background: 'var(--surface-page)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        <span style={{ ...label, color: 'var(--fg-1)' }}>{P.short}</span>
        <LanguageToggle value={lang} onChange={setLang} />
      </header>
      {mobile ? (
        <main style={{ display: 'flex', flexDirection: 'column', gap: 36, padding: '16px 0 48px' }}>{cover}{text}</main>
      ) : (
        <main style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)', gap: 'clamp(40px, 6vw, 112px)', alignItems: 'center', paddingBottom: 64 }}>{text}{cover}</main>
      )}
    </div>
  );
}

Object.assign(window, { StartScreen });
