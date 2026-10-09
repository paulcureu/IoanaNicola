function ProjectMeta({ p, lang, c, mobile }) {
  const U = window.SiteUI, P = window.PORTFOLIO;
  const rows = [
    [c.project.discipline, p.discipline[lang]],
    [c.project.year, P.year],
    p.place ? [c.project.place, p.place] : null,
    p.team ? [c.project.team, p.team] : null,
    [c.project.inBook, U.pagesLabel(p, c)],
  ].filter(Boolean);
  return (
    <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1fr', columnGap: 24, borderTop: '1px solid var(--line)' }}>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '120px minmax(0,1fr)', gap: mobile ? 4 : 16, padding: '12px 0', borderBottom: '1px solid var(--line)', gridColumn: Array.isArray(v) && mobile ? '1 / -1' : 'auto' }}>
          <dt style={U.label}>{k}</dt>
          <dd style={{ margin: 0, font: 'var(--weight-regular) 14px/1.45 var(--font-sans)' }}>
            {Array.isArray(v) ? (
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ color: 'var(--fg-2)' }}>{c.project.teamNote}</span>
                {v.map((n, i) => <span key={i}><U.Val v={n} /></span>)}
              </span>
            ) : v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectGroup({ g, lang, c, mobile, base, motion, onOpen }) {
  const { Reveal, Figure } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const U = window.SiteUI;
  const wide = it => it.w / it.h > 2.2;
  const three = !mobile && g.items.length === 3 && !g.items.some(wide);
  const cols = mobile ? '1fr' : three ? 'repeat(3, minmax(0,1fr))' : 'repeat(2, minmax(0,1fr))';
  return (
    <section style={{ ...U.wrap, paddingTop: mobile ? 64 : 128 }}>
      <Reveal disabled={!motion} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--line-strong)', paddingTop: 16, marginBottom: mobile ? 28 : 56 }}>
        <span style={{ ...U.label, color: 'var(--fg-1)' }}>{c.project.groups[g.type]}</span>
        <span style={U.label}>{U.pad(g.items.length)}</span>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: cols, columnGap: mobile ? 0 : 48, rowGap: mobile ? 44 : 88, alignItems: 'end' }}>
        {g.items.map((it, j) => {
          const full = !mobile && (g.items.length === 1 || wide(it));
          return (
            <Reveal key={it.key} disabled={!motion} delay={mobile ? 0 : (j % (three ? 3 : 2)) * 120} style={{ gridColumn: full ? '1 / -1' : 'auto', display: 'flex', justifyContent: full && g.items.length === 1 ? 'center' : 'flex-start' }}>
              <Figure src={U.img(base, it.key)} width={it.w} height={it.h} caption={it.cap[lang]} onOpen={() => onOpen(it.key)} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ProjectPage({ id, lang, mobile, base, motion }) {
  const { Reveal, Lightbox, Button, ProjectPager, Icon } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO, c = P.copy[lang], U = window.SiteUI;
  const n = P.projects.length;
  const idx = Math.max(0, P.projects.findIndex(x => x.id === id));
  const p = P.projects[idx];
  const prev = P.projects[(idx - 1 + n) % n], next = P.projects[(idx + 1) % n];
  const all = [p.hero, ...p.groups.flatMap(g => g.items)].filter(Boolean);
  const [lb, setLb] = React.useState(-1);
  const open = key => setLb(all.findIndex(it => it.key === key));
  const concept = p.concept ? p.concept[lang] : null;
  const toPager = x => ({ href: `#/proiecte/${x.id}`, number: x.number, title: x.title[lang] });

  return (
    <div data-screen-label={`Project ${p.number}`}>
      <section style={{ ...U.wrap, padding: `${mobile ? 28 : 56}px var(--frame-margin) ${mobile ? 40 : 88}px` }}>
        <a href="#/proiecte" style={{ ...U.label, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', minHeight: 44 }}>
          <Icon name="arrow-left" size={14} />{c.project.back}
        </a>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0,1fr))', columnGap: 24, rowGap: 40, alignItems: 'end', marginTop: mobile ? 24 : 72 }}>
          <Reveal disabled={!motion} style={{ gridColumn: mobile ? 'auto' : '1 / span 8', display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 24 }}>
            <span style={{ ...U.label, display: 'flex', gap: 14, flexWrap: 'wrap' }}><span style={{ color: 'var(--fg-1)' }}>{p.number}</span>{p.discipline[lang]}</span>
            <U.Display size={mobile ? 'clamp(40px, 11vw, 52px)' : 'clamp(56px, 6.6vw, 112px)'}>{p.title[lang]}</U.Display>
            {p.subtitle && <p style={{ margin: 0, font: `var(--weight-light) ${mobile ? 18 : 24}px/1.35 var(--font-sans)`, color: 'var(--fg-2)' }}>{p.subtitle[lang]}</p>}
          </Reveal>
          <Reveal disabled={!motion} delay={120} style={{ gridColumn: mobile ? 'auto' : '9 / span 4' }}>
            <ProjectMeta p={p} lang={lang} c={c} mobile={mobile} />
          </Reveal>
        </div>
      </section>

      {p.hero && (
        <Reveal disabled={!motion} y={0} duration={1200}>
          <button type="button" onClick={() => setLb(0)} aria-label={p.hero.cap[lang]} style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'var(--surface-sunken)', cursor: 'zoom-in' }}>
            <img src={U.img(base, p.hero.key)} alt={p.hero.cap[lang]} style={{ width: '100%', height: mobile ? 'auto' : 'min(86vh, 70vw)', aspectRatio: mobile ? String(p.hero.w / p.hero.h) : 'auto', objectFit: 'cover', display: 'block' }} />
          </button>
          <div style={{ ...U.wrap, paddingTop: 14, font: 'var(--text-caption)', color: 'var(--fg-2)' }}>{p.hero.cap[lang]}</div>
        </Reveal>
      )}

      {concept && (
        <section style={{ ...U.wrap, paddingTop: mobile ? 56 : 128, display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0,1fr))', columnGap: 24, rowGap: 24 }}>
          <Reveal disabled={!motion} style={{ gridColumn: mobile ? 'auto' : '1 / span 3' }}>
            <span style={{ ...U.label, color: 'var(--fg-1)' }}>{c.project.concept}</span>
          </Reveal>
          <div style={{ gridColumn: mobile ? 'auto' : '4 / span 9', display: 'flex', flexDirection: 'column', gap: mobile ? 28 : 48 }}>
            <Reveal disabled={!motion}>
              <p style={{ margin: 0, maxWidth: '30ch', font: `var(--weight-light) ${mobile ? '22px' : 'clamp(26px, 2.5vw, 36px)'}/1.3 var(--font-sans)`, letterSpacing: '-.01em', textWrap: 'pretty' }}>{concept[0]}</p>
            </Reveal>
            <Reveal disabled={!motion} delay={120} style={{ columnCount: mobile ? 1 : 2, columnGap: 48, maxWidth: 1000 }}>
              {concept.slice(1).map((t, i) => (
                <p key={i} style={{ margin: '0 0 1.1em', font: 'var(--weight-regular) 16px/1.7 var(--font-sans)', color: 'var(--fg-1)', textWrap: 'pretty', breakInside: 'avoid-column' }}>{t}</p>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {p.groups.map(g => <ProjectGroup key={g.type} g={g} lang={lang} c={c} mobile={mobile} base={base} motion={motion} onOpen={open} />)}

      <section style={{ ...U.wrap, paddingTop: mobile ? 72 : 160, paddingBottom: mobile ? 56 : 96 }}>
        <Reveal disabled={!motion} style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: 24, padding: mobile ? '32px 0' : '48px 0', borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={U.label}>{c.project.inBook}</span>
            <span style={{ font: `var(--weight-light) ${mobile ? 28 : 40}px/1.1 var(--font-sans)`, letterSpacing: '-.015em' }}>{U.pagesLabel(p, c)}</span>
          </div>
          <Button variant="primary" iconAfter="arrow-right" href={`#/carte/${p.pages[0]}`} style={mobile ? { justifyContent: 'space-between' } : null}>{c.project.openBook}</Button>
        </Reveal>
        <ProjectPager prev={toPager(prev)} next={toPager(next)} prevLabel={c.project.prev} nextLabel={c.project.next} compact={mobile} style={{ borderTop: 0, marginTop: mobile ? 8 : 24 }} />
      </section>

      <Lightbox items={all.map(it => ({ src: U.img(base, it.key), caption: it.cap[lang] }))} index={Math.max(0, lb)} open={lb >= 0} onClose={() => setLb(-1)} labels={c.lightbox} />
    </div>
  );
}

Object.assign(window, { ProjectPage });
