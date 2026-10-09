function AboutPage({ lang, mobile, base, motion }) {
  const { Reveal, Button } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO, c = P.copy[lang], a = c.about, U = window.SiteUI;
  const grid = { display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0,1fr))', columnGap: 24, rowGap: 24 };
  const rows = [[a.email, P.contact.email], [a.phone, P.contact.phone], [a.social, P.contact.social], [a.linkedin, P.contact.linkedin]];
  return (
    <div data-screen-label="About">
      <section style={{ ...U.wrap, ...grid, padding: `${mobile ? 48 : 112}px var(--frame-margin) 0` }}>
        <Reveal disabled={!motion} style={{ gridColumn: mobile ? 'auto' : '1 / span 3' }}><span style={{ ...U.label, color: 'var(--fg-1)' }}>{a.label}</span></Reveal>
        <Reveal disabled={!motion} delay={80} style={{ gridColumn: mobile ? 'auto' : '4 / span 8', display: 'flex', flexDirection: 'column', gap: mobile ? 24 : 36 }}>
          <U.Display size={mobile ? 'clamp(40px, 11vw, 52px)' : 'clamp(56px, 6vw, 96px)'}>{P.name}</U.Display>
          <p style={{ margin: 0, maxWidth: '32ch', font: `var(--weight-light) ${mobile ? '22px' : 'clamp(24px, 2.2vw, 32px)'}/1.3 var(--font-sans)`, letterSpacing: '-.01em', textWrap: 'pretty' }}>{a.lead}</p>
          <p style={{ margin: 0, maxWidth: '60ch', font: 'var(--weight-regular) 16px/1.7 var(--font-sans)' }}><U.Ph>{a.bio}</U.Ph></p>
        </Reveal>
      </section>
      <section style={{ ...U.wrap, ...grid, padding: `${mobile ? 64 : 128}px var(--frame-margin) ${mobile ? 72 : 160}px` }}>
        <Reveal disabled={!motion} style={{ gridColumn: mobile ? 'auto' : '1 / span 3' }}><span style={{ ...U.label, color: 'var(--fg-1)' }}>{a.contact}</span></Reveal>
        <Reveal disabled={!motion} delay={80} style={{ gridColumn: mobile ? 'auto' : '4 / span 6', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <dl style={{ margin: 0, borderTop: '1px solid var(--line)' }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: mobile ? '96px minmax(0,1fr)' : '160px minmax(0,1fr)', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--line)', alignItems: 'baseline' }}>
                <dt style={U.label}>{k}</dt>
                <dd style={{ margin: 0, font: `var(--weight-light) ${mobile ? 17 : 20}px/1.35 var(--font-sans)`, overflowWrap: 'anywhere' }}><U.Val v={v} /></dd>
              </div>
            ))}
          </dl>
          <div style={{ display: 'flex', gap: 12, flexDirection: mobile ? 'column' : 'row', flexWrap: 'wrap' }}>
            <Button variant="primary" icon="download" href={base + P.pdf} download={P.pdfName} style={mobile ? { justifyContent: 'center' } : null}>{a.pdf}</Button>
            <Button iconAfter="arrow-right" href="#/carte/1" style={mobile ? { justifyContent: 'center' } : null}>{a.book}</Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

Object.assign(window, { AboutPage });
