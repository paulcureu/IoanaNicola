const RDS = window.BudeIoanaNicolaPortofoliuDS_69cab2;

function currentSection(sections, page) {
  return sections.reduce((acc, s) => (page >= s.page ? s : acc), null);
}

function ReaderHeader({ lang, setLang, page, onHome, mobile }) {
  const { LanguageToggle } = RDS;
  const P = window.PORTFOLIO, s = currentSection(P.sections[lang], page);
  const label = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' };
  return (
    <header style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr auto' : '1fr auto 1fr', alignItems: 'center', height: 64, gap: 16 }}>
      <button type="button" onClick={onHome} style={{ justifySelf: 'start', background: 'transparent', border: 0, padding: '8px 0', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--fg-1)' }}>
        <span style={{ font: 'var(--weight-regular) 14px/1 var(--font-sans)' }}>{P.name}</span>
        <span style={{ ...label, fontSize: 10 }}>{P.short}</span>
      </button>
      {!mobile && (
        <div style={{ ...label, display: 'flex', gap: 12, minHeight: 14, opacity: s ? 1 : 0, transition: 'opacity var(--dur-base)' }}>
          <span style={{ color: 'var(--fg-1)' }}>{s && s.number}</span><span>{s && s.title}</span>
        </div>
      )}
      <LanguageToggle value={lang} onChange={setLang} style={{ justifySelf: 'end' }} />
    </header>
  );
}

function Reader({ lang, setLang, page, setPage, onHome, layout, isFs, toggleFs, base }) {
  const { FlipBook, Toolbar, TableOfContents } = RDS;
  const P = window.PORTFOLIO, c = P.copy[lang];
  const [toc, setToc] = React.useState(false);
  const spread = layout === 'spread';
  const s = p => Math.floor(p / 2);
  const range = spread ? [s(page) * 2 || null, s(page) * 2 + 1 <= P.total ? s(page) * 2 + 1 : null] : undefined;
  const prev = () => setPage(spread ? Math.max(1, 2 * (s(page) - 1)) : Math.max(1, page - 1));
  const next = () => setPage(spread ? Math.min(P.total, 2 * (s(page) + 1)) : Math.min(P.total, page + 1));
  const canNext = spread ? s(page) < s(P.total) : page < P.total;
  const ratio = (spread ? 2 : 1) * P.aspect;
  return (
    <div data-screen-label="Reader" style={{ height: '100vh', display: 'grid', gridTemplateRows: 'auto minmax(0,1fr) auto', padding: '0 var(--frame-margin)', background: 'var(--surface-page)', overflow: 'hidden' }}>
      <ReaderHeader lang={lang} setLang={setLang} page={page} onHome={onHome} />
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        <div style={{ width: `min(100%, calc((100vh - 64px - 96px - 32px) * ${ratio}))` }}>
          <FlipBook pages={P.pages(base)} page={page} onPageChange={setPage} mode={layout} aspect={P.aspect} keyboard={!toc} altPrefix={c.page} />
        </div>
      </main>
      <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 96 }}>
        <Toolbar page={page} total={P.total} range={range} onPrev={prev} onNext={next} canPrev={page > 1} canNext={canNext}
          onContents={() => setToc(true)} contentsOpen={toc} onFullscreen={toggleFs} isFullscreen={isFs}
          downloadHref={base + P.pdf} downloadName={P.pdfName} labels={c.toolbar} />
      </footer>
      <TableOfContents sections={P.sections[lang]} currentPage={page} title={c.contents} closeLabel={c.close}
        placement="right" open={toc} onClose={() => setToc(false)} onSelect={p => { setToc(false); setPage(p); }} />
    </div>
  );
}

function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight });
  const [vp, setVp] = React.useState(get);
  React.useEffect(() => {
    const f = () => setVp(get());
    window.addEventListener('resize', f); window.addEventListener('orientationchange', f);
    return () => { window.removeEventListener('resize', f); window.removeEventListener('orientationchange', f); };
  }, []);
  return vp;
}

function useBox(ref) {
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return box;
}

/* Phone reader. Portrait: header, page, caption, toolbar. Landscape (phone turned): no header — page fills the height, one slim bar below. The page is sized to fit both dimensions of the free area. */
function MobileReader({ lang, setLang, page, setPage, onHome, base }) {
  const { SwipeViewer, Toolbar, TableOfContents, LanguageToggle } = RDS;
  const P = window.PORTFOLIO, c = P.copy[lang];
  const [toc, setToc] = React.useState(false);
  const [swiped, setSwiped] = React.useState(false);
  const vp = useViewport();
  const landscape = vp.w > vp.h;
  const mainRef = React.useRef(null);
  const box = useBox(mainRef);
  const capH = landscape ? 0 : 68;
  const margin = landscape ? 16 : 12;
  const imgW = box.w ? Math.max(0, Math.min(box.w - 2 * margin, (box.h - capH - (landscape ? 2 * 8 : 0)) * P.aspect)) : 0;
  const gap = box.w ? Math.max(margin, (box.w - imgW) / 2) : margin;
  const sec = currentSection(P.sections[lang], page);
  const change = p => { setSwiped(true); setPage(p); };
  const toolbar = (
    <Toolbar compact page={page} total={P.total} onPrev={() => change(Math.max(1, page - 1))} onNext={() => change(Math.min(P.total, page + 1))}
      canPrev={page > 1} canNext={page < P.total} onContents={() => setToc(true)} contentsOpen={toc}
      downloadHref={base + P.pdf} downloadName={P.pdfName} labels={c.toolbar} />
  );
  const label = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' };
  return (
    <div data-screen-label="Reader — mobile" style={{ height: '100dvh', display: 'grid', gridTemplateRows: landscape ? 'minmax(0,1fr) auto' : 'auto minmax(0,1fr) auto', gridTemplateColumns: 'minmax(0,1fr)', background: 'var(--surface-page)', overflow: 'hidden' }}>
      {!landscape && <div style={{ padding: '0 20px' }}><ReaderHeader lang={lang} setLang={setLang} page={page} onHome={onHome} mobile /></div>}
      <main ref={mainRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0, minWidth: 0, overflow: 'hidden', gap: landscape ? 0 : 24, paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}>
        <SwipeViewer key={Math.round(box.w) + (landscape ? 'l' : 'p')} pages={P.pages(base)} page={page} onPageChange={change} aspect={P.aspect} gap={gap} altPrefix={c.page} />
        {!landscape && <div style={{ padding: '0 20px', minHeight: 44, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sec ? (
            <>
              <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--fg-1)' }}>{sec.number}</span>
              <span style={{ font: 'var(--weight-regular) 15px/1.35 var(--font-sans)' }}>{sec.title}{sec.subtitle ? <span style={{ color: 'var(--fg-2)' }}> — {sec.subtitle}</span> : null}</span>
            </>
          ) : (
            <span style={{ font: 'var(--text-caption)', color: 'var(--fg-2)', opacity: swiped ? 0 : 1, transition: 'opacity var(--dur-slow)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span>{c.swipeHint}</span><span>{c.rotateHint}</span>
            </span>
          )}
        </div>}
      </main>
      {landscape ? (
        <footer style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12, borderTop: '1px solid var(--line)', padding: '0 max(20px, env(safe-area-inset-right)) env(safe-area-inset-bottom) max(20px, env(safe-area-inset-left))' }}>
          <button type="button" onClick={onHome} style={{ justifySelf: 'start', background: 'transparent', border: 0, padding: '8px 0', minHeight: 44, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-1)' }}>
            <span style={{ font: 'var(--weight-regular) 13px/1 var(--font-sans)', whiteSpace: 'nowrap' }}>{P.name}</span>
            {sec && <span style={{ ...label, fontSize: 10 }}>{sec.number}</span>}
          </button>
          {toolbar}
          <LanguageToggle value={lang} onChange={setLang} style={{ justifySelf: 'end' }} />
        </footer>
      ) : (
        <footer style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--line)', paddingBottom: 'env(safe-area-inset-bottom)' }}>{toolbar}</footer>
      )}
      <TableOfContents sections={P.sections[lang]} currentPage={page} title={c.contents} closeLabel={c.close}
        placement="bottom" open={toc} onClose={() => setToc(false)} onSelect={p => { setToc(false); change(p); }} />
    </div>
  );
}

Object.assign(window, { Reader, MobileReader, ReaderHeader, currentSection });
