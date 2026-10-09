function HomePage({ lang, mobile, base, motion }) {
  const { Button, Icon } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO, c = P.copy[lang], U = window.SiteUI;
  const [loaded, setLoaded] = React.useState(false);
  const imgStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: mobile ? '30% 40%' : '50% 42%',
    opacity: loaded ? 1 : 0, transform: loaded || !motion ? 'scale(1)' : 'scale(1.04)',
    transition: 'opacity 1200ms var(--ease-out), transform 2600ms var(--ease-out)',
  };
  const image = <img src={U.img(base, '02-randare-exterior')} alt={c.home.credit} onLoad={() => setLoaded(true)} style={imgStyle} />;
  const credit = (
    <a href="#/proiecte/casa" style={{ ...U.label, display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)', textDecoration: 'none', fontSize: 10 }}>
      <span style={{ color: 'var(--fg-1)' }}>02</span>{c.home.credit}<Icon name="arrow-up-right" size={14} />
    </a>
  );
  const text = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 22 }}>
      <span style={U.label}>{c.home.kicker}</span>
      <U.Display size={mobile ? 'clamp(44px, 12.5vw, 60px)' : 'clamp(56px, 6.4vw, 104px)'}>{P.name}</U.Display>
      <p style={{ margin: 0, font: `var(--weight-light) ${mobile ? 16 : 19}px/1.45 var(--font-sans)`, color: 'var(--fg-2)' }}>{c.faculty}<br />{c.city}</p>
      <div style={{ display: 'flex', gap: 12, marginTop: mobile ? 8 : 12, flexDirection: mobile ? 'column' : 'row', flexWrap: 'wrap' }}>
        <Button variant="primary" iconAfter="arrow-right" href="#/carte/1" style={mobile ? { justifyContent: 'space-between' } : null}>{c.home.browse}</Button>
        <Button href="#/proiecte" style={mobile ? { justifyContent: 'center' } : null}>{c.home.projects}</Button>
      </div>
    </div>
  );
  if (mobile) {
    return (
      <div data-screen-label="Home" style={{ minHeight: 'calc(100svh - 64px)', display: 'grid', gridTemplateRows: 'minmax(300px, 52svh) auto' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-sunken)' }}>{image}</div>
        <div style={{ ...U.wrap, padding: '32px var(--frame-margin) 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>{text}{credit}</div>
      </div>
    );
  }
  return (
    <section data-screen-label="Home" style={{ position: 'relative', height: 'calc(100svh - 72px)', minHeight: 620, overflow: 'hidden', background: 'var(--surface-sunken)' }}>
      {image}
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: 'min(760px, 56%)', background: 'var(--surface-page)', padding: '48px var(--frame-margin) 40px 56px', display: 'flex', flexDirection: 'column', gap: 36,
        opacity: loaded || !motion ? 1 : 0, transform: loaded || !motion ? 'none' : 'translateY(24px)', transition: 'opacity 900ms var(--ease-out) 300ms, transform 900ms var(--ease-out) 300ms' }}>
        {text}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>{credit}</div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
