const PROJECTS_EDITORIAL = [
  { col: '1 / span 6', aspect: '5 / 4', mt: 0 },
  { col: '8 / span 5', aspect: '4 / 5', mt: 160 },
  { col: '2 / span 6', aspect: '3 / 2', mt: 0 },
  { col: '9 / span 4', aspect: '1 / 1', mt: 240 },
  { col: '4 / span 6', aspect: '16 / 10', mt: 0 },
];

function ProjectsPage({ lang, mobile, base, motion, grid }) {
  const { ProjectCard, Reveal } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO, c = P.copy[lang], U = window.SiteUI;
  const editorial = !mobile && grid === 'editorial';
  const cols = mobile ? '1fr' : editorial ? 'repeat(12, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))';
  return (
    <div data-screen-label="Projects">
      <section style={{ ...U.wrap, padding: `${mobile ? 48 : 112}px var(--frame-margin) ${mobile ? 48 : 120}px`, display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0, 1fr))', columnGap: 24, rowGap: 32, alignItems: 'end' }}>
        <Reveal disabled={!motion} style={{ gridColumn: mobile ? 'auto' : '1 / span 7', display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 24 }}>
          <span style={U.label}>{c.list.kicker}</span>
          <U.Display size={mobile ? '48px' : 'clamp(64px, 8vw, 128px)'}>{c.list.title}</U.Display>
        </Reveal>
        {!mobile && (
          <Reveal disabled={!motion} delay={120} as="ol" style={{ gridColumn: '9 / span 4', margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid var(--line)' }}>
            {P.projects.map(p => (
              <li key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <a href={`#/proiecte/${p.id}`} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', alignItems: 'baseline', padding: '12px 0', textDecoration: 'none', color: 'var(--fg-1)' }}>
                  <span style={{ ...U.label, color: 'var(--fg-1)' }}>{p.number}</span>
                  <span style={{ font: 'var(--weight-regular) 14px/1.35 var(--font-sans)' }}>{p.title[lang]}</span>
                </a>
              </li>
            ))}
          </Reveal>
        )}
      </section>
      <section style={{ ...U.wrap, display: 'grid', gridTemplateColumns: cols, columnGap: 24, rowGap: mobile ? 56 : editorial ? 128 : 80, paddingBottom: mobile ? 80 : 176 }}>
        {P.projects.map((p, i) => {
          const L = editorial ? PROJECTS_EDITORIAL[i] : null;
          const aspect = L ? L.aspect : mobile ? (p.id === 'casa' ? '4 / 5' : '4 / 3') : '4 / 3';
          return (
            <Reveal key={p.id} disabled={!motion} delay={!mobile && !editorial ? (i % 3) * 120 : 0}
              style={{ gridColumn: L ? L.col : 'auto', marginTop: L ? L.mt : 0 }}>
              <ProjectCard href={`#/proiecte/${p.id}`} image={U.img(base, p.cover)} aspect={aspect}
                number={p.number} title={p.title[lang]} discipline={p.discipline[lang]} badge={p.team ? c.project.teamNote : undefined} />
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}

Object.assign(window, { ProjectsPage });
