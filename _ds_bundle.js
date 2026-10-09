/* @ds-bundle: {"format":4,"namespace":"BudeIoanaNicolaPortofoliuDS_69cab2","components":[{"name":"FlipBook","sourcePath":"components/book/FlipBook.jsx"},{"name":"PageCounter","sourcePath":"components/book/PageCounter.jsx"},{"name":"SwipeViewer","sourcePath":"components/book/SwipeViewer.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"LanguageToggle","sourcePath":"components/navigation/LanguageToggle.jsx"},{"name":"TableOfContents","sourcePath":"components/navigation/TableOfContents.jsx"},{"name":"Toolbar","sourcePath":"components/navigation/Toolbar.jsx"},{"name":"Figure","sourcePath":"components/site/Figure.jsx"},{"name":"Lightbox","sourcePath":"components/site/Lightbox.jsx"},{"name":"ProjectCard","sourcePath":"components/site/ProjectCard.jsx"},{"name":"ProjectPager","sourcePath":"components/site/ProjectPager.jsx"},{"name":"Reveal","sourcePath":"components/site/Reveal.jsx"},{"name":"SiteFooter","sourcePath":"components/site/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/site/SiteHeader.jsx"}],"sourceHashes":{"components/book/FlipBook.jsx":"a6ece86f4583","components/book/PageCounter.jsx":"cbebaf0d772c","components/book/SwipeViewer.jsx":"0513507649da","components/core/Button.jsx":"5183fb2d268f","components/core/Icon.jsx":"a57b8a5bd9ab","components/core/IconButton.jsx":"64286940b373","components/navigation/LanguageToggle.jsx":"3dac711d3a65","components/navigation/TableOfContents.jsx":"8aec1cdfb2f6","components/navigation/Toolbar.jsx":"c1a651a11299","components/site/Figure.jsx":"a92cd98013e0","components/site/Lightbox.jsx":"575f5e47fa22","components/site/ProjectCard.jsx":"b61defd7683e","components/site/ProjectPager.jsx":"ae3867d234b8","components/site/Reveal.jsx":"77cb9b980bf2","components/site/SiteFooter.jsx":"5560720ba177","components/site/SiteHeader.jsx":"f09a11a451f9","ui_kits/portfolio-site/AboutPage.jsx":"b225776a0425","ui_kits/portfolio-site/HomePage.jsx":"07052477b6cd","ui_kits/portfolio-site/ProjectPage.jsx":"35c17b72cbcb","ui_kits/portfolio-site/ProjectsPage.jsx":"394a299c36d7","ui_kits/portfolio-site/Reader.jsx":"65ee54c16d93","ui_kits/portfolio-site/StartScreen.jsx":"92c6f3128fac","ui_kits/portfolio-site/data.js":"b4fc0cdfe446","ui_kits/portfolio-site/tweaks-panel.jsx":"d259e3a86f73","ui_kits/portfolio-site/ui.jsx":"49b560f88d8c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BudeIoanaNicolaPortofoliuDS_69cab2 = window.BudeIoanaNicolaPortofoliuDS_69cab2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/book/FlipBook.jsx
try { (() => {
/* Spread s shows pages [2s, 2s+1]; page 1 (cover) sits alone on the right, like a bound book. */
const spreadOf = p => Math.floor(p / 2);
function Face({
  src,
  side,
  alt
}) {
  const shade = side === 'left' ? 'linear-gradient(to left, var(--book-gutter-shade), rgba(0,0,0,0) 6%)' : 'linear-gradient(to right, var(--book-gutter-shade), rgba(0,0,0,0) 6%)';
  if (!src) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--white)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    draggable: false,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      userSelect: 'none'
    }
  }), side !== 'none' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: shade,
      pointerEvents: 'none'
    }
  }));
}

/**
 * Page-turning book for pre-rendered landscape pages.
 * Controlled via `page` + `onPageChange`, or uncontrolled.
 */
function FlipBook({
  pages = [],
  page,
  onPageChange,
  mode = 'spread',
  aspect = 842 / 595,
  keyboard = true,
  altPrefix = 'Pagina',
  style
}) {
  const total = pages.length;
  const [inner, setInner] = React.useState(1);
  const current = page ?? inner;
  const unit = p => mode === 'spread' ? spreadOf(p) : p;
  const [shown, setShown] = React.useState(unit(current));
  const [anim, setAnim] = React.useState(null); // {from,to,dir,go}
  const shownRef = React.useRef(shown);
  shownRef.current = shown;
  const src = n => n >= 1 && n <= total ? pages[n - 1] : null;
  const L = s => mode === 'spread' ? src(2 * s) : null;
  const R = s => mode === 'spread' ? src(2 * s + 1) : src(s);
  const maxUnit = mode === 'spread' ? spreadOf(total) : total;
  const minUnit = mode === 'spread' ? 0 : 1;
  React.useEffect(() => {
    pages.forEach(u => {
      const i = new Image();
      i.src = u;
    });
  }, [pages.join('|')]);

  // target follows current page
  React.useEffect(() => {
    const to = unit(current);
    if (anim || to === shownRef.current) return;
    const dir = to > shownRef.current ? 1 : -1;
    setAnim({
      from: shownRef.current,
      to,
      dir,
      go: false
    });
    requestAnimationFrame(() => requestAnimationFrame(() => setAnim(a => a ? {
      ...a,
      go: true
    } : a)));
  }, [current, mode, anim]);
  React.useEffect(() => {
    if (!anim) setShown(unit(current));
  }, [mode]);
  const finish = () => {
    if (anim) {
      setShown(anim.to);
      setAnim(null);
    }
  };
  React.useEffect(() => {
    if (anim && anim.go) {
      const t = setTimeout(finish, 900);
      return () => clearTimeout(t);
    }
  }, [anim && anim.go]);
  const go = p => {
    const n = Math.max(1, Math.min(total, p));
    if (n === current) return;
    if (page === undefined) setInner(n);
    onPageChange && onPageChange(n);
  };
  const step = d => {
    if (anim) return;
    const u = unit(current) + d;
    if (u < minUnit || u > maxUnit) return;
    go(mode === 'spread' ? Math.max(1, 2 * u) : u);
  };
  React.useEffect(() => {
    if (!keyboard) return;
    const k = e => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
  const spread = mode === 'spread';
  const base = anim ? anim : null;
  const under = base ? base.dir > 0 ? {
    l: L(base.from),
    r: R(base.to)
  } : {
    l: L(base.to),
    r: R(base.from)
  } : {
    l: L(shown),
    r: R(shown)
  };
  const target = anim ? anim.to : shown;
  const offset = spread ? !L(target) ? '-25%' : !R(target) ? '25%' : '0%' : '0%';
  const alt = n => `${altPrefix} ${n}`;
  let leaf = null;
  if (base) {
    const next = base.dir > 0;
    const front = spread ? next ? R(base.from) : L(base.from) : R(base.from);
    const back = spread ? next ? L(base.to) : R(base.to) : null;
    const rot = base.go ? next ? -180 : 180 : 0;
    leaf = /*#__PURE__*/React.createElement("div", {
      onTransitionEnd: e => {
        if (e.target === e.currentTarget) finish();
      },
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: spread ? '50%' : '100%',
        left: spread ? next ? '50%' : 0 : 0,
        transformOrigin: spread ? next ? 'left center' : 'right center' : 'left center',
        transformStyle: 'preserve-3d',
        transform: `rotateY(${rot}deg)`,
        transition: base.go ? 'transform var(--dur-page) var(--ease-page)' : 'none',
        zIndex: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Face, {
      src: front,
      side: spread ? next ? 'right' : 'left' : 'none',
      alt: ""
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `linear-gradient(${next ? 'to left' : 'to right'}, rgba(70,58,49,0), rgba(70,58,49,.18))`,
        opacity: base.go ? 1 : 0,
        transition: 'opacity var(--dur-page) var(--ease-page)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: 'var(--paper-1)'
      }
    }, back && /*#__PURE__*/React.createElement(Face, {
      src: back,
      side: next ? 'left' : 'right',
      alt: ""
    })));
  }
  const ratio = spread ? aspect * 2 : aspect;
  const atStart = unit(current) <= minUnit,
    atEnd = unit(current) >= maxUnit;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: String(ratio),
      perspective: '2600px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      transform: `translateX(${offset})`,
      transition: 'transform var(--dur-page) var(--ease-page)',
      transformStyle: 'preserve-3d'
    }
  }, spread ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '50%',
      boxShadow: under.l ? 'var(--shadow-book)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Face, {
    src: under.l,
    side: "left",
    alt: alt(2 * (anim ? anim.dir > 0 ? anim.from : anim.to : shown))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '50%',
      boxShadow: under.r ? 'var(--shadow-book)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Face, {
    src: under.r,
    side: "right",
    alt: alt(2 * (anim ? anim.dir > 0 ? anim.to : anim.from : shown) + 1)
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      boxShadow: 'var(--shadow-book)'
    }
  }, /*#__PURE__*/React.createElement(Face, {
    src: anim ? R(anim.to) : R(shown),
    side: "none",
    alt: alt(anim ? anim.to : shown)
  })), leaf), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "previous",
    tabIndex: -1,
    onClick: () => step(-1),
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '50%',
      background: 'transparent',
      border: 0,
      cursor: atStart ? 'default' : 'w-resize',
      zIndex: 4
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "next",
    tabIndex: -1,
    onClick: () => step(1),
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '50%',
      background: 'transparent',
      border: 0,
      cursor: atEnd ? 'default' : 'e-resize',
      zIndex: 4
    }
  }));
}
Object.assign(__ds_scope, { FlipBook });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/book/FlipBook.jsx", error: String((e && e.message) || e) }); }

// components/book/PageCounter.jsx
try { (() => {
const pad = n => String(n).padStart(2, '0');

/** "03 / 15" — tabular page indicator. Pass `range` for spreads ("02–03 / 15"). */
function PageCounter({
  page,
  total,
  range,
  inverse = false,
  style
}) {
  const cur = range && range[0] && range[1] ? `${pad(range[0])}–${pad(range[1])}` : pad(page);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 8,
      minWidth: 64,
      justifyContent: 'center',
      font: 'var(--weight-regular) var(--size-caption)/1 var(--font-sans)',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '.06em',
      color: inverse ? 'var(--fg-inverse)' : 'var(--fg-1)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, cur), /*#__PURE__*/React.createElement("span", {
    style: {
      color: inverse ? 'rgba(251,250,247,.6)' : 'var(--fg-2)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: inverse ? 'rgba(251,250,247,.6)' : 'var(--fg-2)'
    }
  }, pad(total)));
}
Object.assign(__ds_scope, { PageCounter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/book/PageCounter.jsx", error: String((e && e.message) || e) }); }

// components/book/SwipeViewer.jsx
try { (() => {
/** Mobile viewer: one page per screen, native horizontal swipe with scroll-snap. */
function SwipeViewer({
  pages = [],
  page,
  onPageChange,
  aspect = 842 / 595,
  gap = 16,
  altPrefix = 'Pagina',
  style
}) {
  const ref = React.useRef(null);
  const [inner, setInner] = React.useState(1);
  const current = page ?? inner;
  const lastReported = React.useRef(current);
  const settle = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = (current - 1) * el.clientWidth;
  }, []);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || current === lastReported.current) return;
    lastReported.current = current;
    el.scrollTo({
      left: (current - 1) * el.clientWidth,
      behavior: 'smooth'
    });
  }, [current]);
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const n = Math.round(el.scrollLeft / el.clientWidth) + 1;
      if (n !== lastReported.current) {
        lastReported.current = n;
        if (page === undefined) setInner(n);
        onPageChange && onPageChange(n);
      }
    }, 90);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onScroll: onScroll,
    style: {
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollSnapType: 'x mandatory',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
      width: '100%',
      overscrollBehaviorX: 'contain',
      ...style
    }
  }, pages.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: u,
    style: {
      flex: '0 0 100%',
      scrollSnapAlign: 'center',
      scrollSnapStop: 'always',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `0 ${gap}px`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: u,
    alt: `${altPrefix} ${i + 1}`,
    loading: Math.abs(i + 1 - current) <= 2 ? 'eager' : 'lazy',
    draggable: false,
    style: {
      width: '100%',
      aspectRatio: String(aspect),
      objectFit: 'cover',
      display: 'block',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-book)'
    }
  }))));
}
Object.assign(__ds_scope, { SwipeViewer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/book/SwipeViewer.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const LUCIDE = 'https://unpkg.com/lucide-static@0.460.0/icons/';
const cache = new Map();
function load(name) {
  if (!cache.has(name)) {
    cache.set(name, fetch(LUCIDE + name + '.svg').then(r => r.ok ? r.text() : '').catch(() => ''));
  }
  return cache.get(name);
}

/** Lucide icon (CDN), re-stroked thin to match the hairline frame. */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.25,
  style,
  className
}) {
  const [svg, setSvg] = React.useState('');
  React.useEffect(() => {
    let live = true;
    load(name).then(t => {
      if (live) setSvg(t);
    });
    return () => {
      live = false;
    };
  }, [name]);
  const html = svg.replace(/width="24"/, `width="${size}"`).replace(/height="24"/, `height="${size}"`).replace(/stroke-width="2"/, `stroke-width="${strokeWidth}"`).replace(/class="[^"]*"/, '');
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: className,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      flex: 'none',
      color: 'currentColor',
      lineHeight: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text button. primary = filled brown, outline = hairline, text = underlined link-style; inverse / outline-inverse for dark grounds. */
function Button({
  children,
  variant = 'outline',
  icon,
  iconAfter,
  onClick,
  href,
  download,
  disabled = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = {
    primary: {
      bg: 'var(--brown-900)',
      bgH: 'var(--brown-800)',
      fg: 'var(--fg-inverse)',
      bd: 'var(--brown-900)'
    },
    outline: {
      bg: 'transparent',
      bgH: 'var(--surface-hover)',
      fg: 'var(--fg-1)',
      bd: 'var(--line-strong)'
    },
    text: {
      bg: 'transparent',
      bgH: 'transparent',
      fg: 'var(--fg-1)',
      bd: 'transparent'
    },
    inverse: {
      bg: 'var(--paper-0)',
      bgH: 'var(--sand-100)',
      fg: 'var(--fg-1)',
      bd: 'var(--paper-0)'
    },
    'outline-inverse': {
      bg: 'transparent',
      bgH: 'rgba(251,250,247,.12)',
      fg: 'var(--fg-inverse)',
      bd: 'rgba(251,250,247,.6)'
    }
  }[variant] || {};
  const isText = variant === 'text';
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    minHeight: isText ? 32 : 'var(--hit-min)',
    padding: isText ? '4px 0' : '0 22px',
    borderRadius: 'var(--radius-1)',
    border: `1px solid ${v.bd}`,
    background: hover && !disabled ? v.bgH : v.bg,
    color: hover && isText ? 'var(--accent-strong)' : v.fg,
    font: 'var(--weight-medium) 12px/1 var(--font-sans)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transform: press && !disabled && !isText ? 'translateY(1px)' : 'none',
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast)',
    ...style
  };
  const h = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: isText ? {
      borderBottom: '1px solid currentColor',
      paddingBottom: 3
    } : null
  }, children), iconAfter && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: 16,
    style: {
      transition: 'transform var(--dur-base) var(--ease-out)',
      transform: hover ? 'translateX(3px)' : 'none'
    }
  }));
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    download: download,
    style: s
  }, h), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: s
  }, h), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 36,
  md: 44
};

/** Round, borderless icon button. Renders <a> when href is set. */
function IconButton({
  icon,
  label,
  onClick,
  href,
  download,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  active = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const d = SIZES[size] || SIZES.md;
  const inverse = variant === 'inverse';
  let bg = 'transparent';
  if (active) bg = inverse ? 'rgba(251,250,247,.16)' : 'var(--surface-hover)';
  if (hover && !disabled) bg = inverse ? 'rgba(251,250,247,.12)' : 'var(--surface-hover)';
  if (press && !disabled) bg = inverse ? 'rgba(251,250,247,.22)' : 'var(--surface-press)';
  const s = {
    width: d,
    height: d,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-pill)',
    border: variant === 'outline' ? '1px solid var(--line-strong)' : '1px solid transparent',
    background: bg,
    color: inverse ? 'var(--fg-inverse)' : 'var(--fg-1)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.32 : 1,
    padding: 0,
    textDecoration: 'none',
    transition: 'background var(--dur-fast) var(--ease-out), opacity var(--dur-fast)',
    flex: 'none',
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    'aria-label': label,
    title: label
  };
  const glyph = /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 18 : 20
  });
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      download: download,
      style: s
    }, handlers), glyph);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    "aria-pressed": active || undefined,
    style: s
  }, handlers), glyph);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LanguageToggle.jsx
try { (() => {
/** RO / EN switch — two quiet text tabs, current one underlined. */
function LanguageToggle({
  value = 'ro',
  onChange,
  options = ['ro', 'en'],
  inverse = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Limba / Language",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      ...style
    }
  }, options.map(o => {
    const on = o === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      type: "button",
      "aria-pressed": on,
      onClick: () => onChange && onChange(o),
      style: {
        minWidth: 36,
        height: 'var(--hit-min)',
        padding: '0 6px',
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        font: 'var(--weight-medium) var(--size-label)/1 var(--font-sans)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: inverse ? on ? 'var(--fg-inverse)' : 'rgba(251,250,247,.6)' : on ? 'var(--fg-1)' : 'var(--fg-2)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        paddingBottom: 4,
        borderBottom: on ? '1px solid currentColor' : '1px solid transparent'
      }
    }, o));
  }));
}
Object.assign(__ds_scope, { LanguageToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LanguageToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TableOfContents.jsx
try { (() => {
const pad = n => String(n).padStart(2, '0');
function Row({
  s,
  active,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("li", {
    style: {
      listStyle: 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onSelect && onSelect(s.page),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-current": active ? 'true' : undefined,
    style: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '40px minmax(0,1fr) auto',
      alignItems: 'baseline',
      gap: 16,
      padding: '18px 0',
      background: 'transparent',
      border: 0,
      borderTop: '1px solid var(--line)',
      cursor: 'pointer',
      textAlign: 'left',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) var(--size-label)/1 var(--font-sans)',
      letterSpacing: '.12em',
      color: active ? 'var(--fg-1)' : 'var(--fg-2)'
    }
  }, s.number), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      transform: hover ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `${active ? 'var(--weight-medium)' : 'var(--weight-regular)'} var(--size-body)/1.35 var(--font-sans)`,
      textWrap: 'pretty'
    }
  }, s.title), s.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--fg-2)',
      textWrap: 'pretty'
    }
  }, s.subtitle)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) var(--size-caption)/1 var(--font-sans)',
      fontVariantNumeric: 'tabular-nums',
      color: hover || active ? 'var(--fg-1)' : 'var(--fg-2)'
    }
  }, pad(s.page))));
}

/** Contents list with jump-to-section. placement: inline | right (side panel) | bottom (mobile sheet). */
function TableOfContents({
  sections = [],
  currentPage,
  onSelect,
  title = 'Cuprins',
  open = true,
  onClose,
  closeLabel = 'Închide',
  placement = 'inline',
  style
}) {
  const activeIdx = sections.reduce((acc, s, i) => currentPage >= s.page ? i : acc, -1);
  const list = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      ...(placement === 'inline' ? style : null)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--fg-2)'
    }
  }, title), onClose && placement !== 'inline' && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: closeLabel,
    onClick: onClose
  })), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      borderBottom: '1px solid var(--line)'
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement(Row, {
    key: s.number,
    s: s,
    active: i === activeIdx,
    onSelect: onSelect
  }))));
  if (placement === 'inline') return list;
  const bottom = placement === 'bottom';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      pointerEvents: open ? 'auto' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-scrim)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-label": title,
    style: {
      position: 'absolute',
      background: 'var(--surface-page)',
      overflowY: 'auto',
      ...(bottom ? {
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: '82%',
        padding: '12px 20px 28px',
        boxShadow: 'var(--shadow-sheet)',
        transform: open ? 'none' : 'translateY(100%)'
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(440px, 92vw)',
        padding: '24px 40px',
        borderLeft: '1px solid var(--line)',
        transform: open ? 'none' : 'translateX(100%)'
      }),
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }, bottom && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 3,
      background: 'var(--line-strong)',
      borderRadius: 2,
      margin: '0 auto 8px'
    }
  }), list));
}
Object.assign(__ds_scope, { TableOfContents });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TableOfContents.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Toolbar.jsx
try { (() => {
const DEFAULT_LABELS = {
  prev: 'Înapoi',
  next: 'Înainte',
  contents: 'Cuprins',
  fullscreen: 'Ecran complet',
  exitFullscreen: 'Ieși din ecran complet',
  download: 'Descarcă PDF'
};

/** Viewer controls: ‹ 03/15 › · contents · fullscreen · download · RO/EN. */
function Toolbar({
  page,
  total,
  range,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  onContents,
  contentsOpen = false,
  onFullscreen,
  isFullscreen = false,
  downloadHref,
  downloadName,
  lang,
  onLangChange,
  labels,
  inverse = false,
  compact = false,
  style
}) {
  const t = {
    ...DEFAULT_LABELS,
    ...labels
  };
  const v = inverse ? 'inverse' : 'ghost';
  const sep = /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 20,
      background: inverse ? 'rgba(251,250,247,.24)' : 'var(--line-strong)',
      margin: '0 8px',
      flex: 'none'
    }
  });
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Portfolio",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: 'var(--toolbar-height)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-left",
    label: t.prev,
    onClick: onPrev,
    disabled: !canPrev,
    variant: v
  }), /*#__PURE__*/React.createElement(__ds_scope.PageCounter, {
    page: page,
    total: total,
    range: range,
    inverse: inverse
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right",
    label: t.next,
    onClick: onNext,
    disabled: !canNext,
    variant: v
  }), sep, onContents && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "list",
    label: t.contents,
    onClick: onContents,
    active: contentsOpen,
    variant: v
  }), onFullscreen && !compact && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: isFullscreen ? 'minimize' : 'maximize',
    label: isFullscreen ? t.exitFullscreen : t.fullscreen,
    onClick: onFullscreen,
    variant: v
  }), downloadHref && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "download",
    label: t.download,
    href: downloadHref,
    download: downloadName || true,
    variant: v
  }), onLangChange && /*#__PURE__*/React.createElement(React.Fragment, null, sep, /*#__PURE__*/React.createElement(__ds_scope.LanguageToggle, {
    value: lang,
    onChange: onLangChange,
    inverse: inverse
  })));
}
Object.assign(__ds_scope, { Toolbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Toolbar.jsx", error: String((e && e.message) || e) }); }

// components/site/Figure.jsx
try { (() => {
/** Image + caption. Never upscales past its native width; capped to ~82vh tall. Click opens the lightbox. */
function Figure({
  src,
  alt,
  caption,
  width,
  height,
  onOpen,
  maxHeight = '82vh',
  openLabel,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const ratio = width && height ? width / height : 4 / 3;
  const w = width ? `min(100%, ${Math.round(width * 1.1)}px, calc(${maxHeight} * ${ratio.toFixed(4)}))` : '100%';
  const img = /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || caption || '',
    loading: "lazy",
    draggable: false,
    style: {
      width: '100%',
      height: 'auto',
      aspectRatio: String(ratio),
      display: 'block',
      objectFit: 'cover',
      background: 'var(--surface-sunken)'
    }
  });
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      width: w,
      ...style
    }
  }, onOpen ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onOpen,
    "aria-label": openLabel || caption,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: 0,
      border: 0,
      background: 'transparent',
      cursor: 'zoom-in',
      display: 'block',
      width: '100%',
      opacity: hover ? 0.92 : 1,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }, img) : img, caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      font: 'var(--text-caption)',
      color: hover ? 'var(--fg-1)' : 'var(--fg-2)',
      transition: 'color var(--dur-base)',
      textWrap: 'pretty'
    }
  }, caption));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Figure.jsx", error: String((e && e.message) || e) }); }

// components/site/Lightbox.jsx
try { (() => {
/** Full-screen image gallery: dark ground, contained image, caption, ←/→/Esc, swipe. */
function Lightbox({
  items = [],
  index = 0,
  open = false,
  onClose,
  onIndexChange,
  labels,
  style
}) {
  const t = {
    close: 'Închide',
    prev: 'Imaginea anterioară',
    next: 'Imaginea următoare',
    ...labels
  };
  const [i, setI] = React.useState(index);
  const [vis, setVis] = React.useState(false);
  const [loaded, setLoaded] = React.useState('');
  const touch = React.useRef(null);
  const n = items.length;
  React.useEffect(() => {
    if (open) setI(index);
  }, [index, open]);
  React.useEffect(() => {
    if (!open) {
      setVis(false);
      return;
    }
    const r = requestAnimationFrame(() => setVis(true));
    return () => cancelAnimationFrame(r);
  }, [open]);
  const go = d => {
    if (!n) return;
    const k = (i + d + n) % n;
    setI(k);
    onIndexChange && onIndexChange(k);
  };
  React.useEffect(() => {
    if (!open) return;
    const k = e => {
      if (e.key === 'Escape') onClose && onClose();else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        go(-1);
      }
    };
    window.addEventListener('keydown', k, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', k, true);
      document.body.style.overflow = prev;
    };
  });
  if (!open || !n) return null;
  const it = items[Math.min(i, n - 1)];
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": it.caption,
    onTouchStart: e => {
      touch.current = e.touches[0].clientX;
    },
    onTouchEnd: e => {
      if (touch.current == null) return;
      const dx = e.changedTouches[0].clientX - touch.current;
      touch.current = null;
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--brown-900)',
      color: 'var(--fg-inverse)',
      display: 'grid',
      gridTemplateRows: '64px minmax(0,1fr) auto',
      opacity: vis ? 1 : 0,
      transition: 'opacity var(--dur-slow) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(8px, 2vw, 24px) 0 clamp(16px, 3vw, 40px)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PageCounter, {
    page: i + 1,
    total: n,
    inverse: true,
    style: {
      justifyContent: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: t.close,
    onClick: onClose,
    variant: "inverse"
  })), /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) onClose && onClose();
    },
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 clamp(12px, 6vw, 96px)',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    key: it.src,
    src: it.src,
    alt: it.caption || '',
    onLoad: () => setLoaded(it.src),
    draggable: false,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      display: 'block',
      background: '#fff',
      opacity: loaded === it.src ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-out)',
      userSelect: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      minHeight: 80,
      padding: '8px clamp(8px, 2vw, 24px) calc(8px + env(safe-area-inset-bottom)) clamp(16px, 3vw, 40px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-light) 15px/1.4 var(--font-sans)',
      color: 'var(--fg-inverse)',
      textWrap: 'pretty'
    }
  }, it.caption), n > 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 4,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-left",
    label: t.prev,
    onClick: () => go(-1),
    variant: "inverse"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right",
    label: t.next,
    onClick: () => go(1),
    variant: "inverse"
  }))));
}
Object.assign(__ds_scope, { Lightbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Lightbox.jsx", error: String((e && e.message) || e) }); }

// components/site/ProjectCard.jsx
try { (() => {
/** Project tile for the index grid: cover image, number · discipline, title. */
function ProjectCard({
  href,
  onClick,
  image,
  number,
  title,
  discipline,
  aspect = '4 / 3',
  imagePosition = '50% 50%',
  badge,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const label = {
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--fg-2)'
  };
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      textDecoration: 'none',
      color: 'var(--fg-1)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      aspectRatio: aspect,
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    loading: "lazy",
    draggable: false,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: imagePosition,
      display: 'block',
      transform: hover ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform 1400ms var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '44px minmax(0,1fr) auto',
      columnGap: 12,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      color: 'var(--fg-1)'
    }
  }, number), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-light) clamp(22px, 2vw, 28px)/1.15 var(--font-sans)',
      letterSpacing: '-.01em',
      textWrap: 'balance'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--fg-2)'
    }
  }, discipline), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      fontSize: 10,
      whiteSpace: 'nowrap',
      padding: '4px 8px',
      border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-pill)'
    }
  }, badge))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: 18,
    style: {
      opacity: hover ? 1 : 0,
      transform: hover ? 'none' : 'translate(-4px, 4px)',
      transition: 'opacity var(--dur-base), transform var(--dur-base) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/site/ProjectPager.jsx
try { (() => {
function Side({
  item,
  label,
  dir,
  compact
}) {
  const [hover, setHover] = React.useState(false);
  if (!item) return /*#__PURE__*/React.createElement("span", null);
  const next = dir > 0;
  return /*#__PURE__*/React.createElement("a", {
    href: item.href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? 10 : 16,
      alignItems: next ? 'flex-end' : 'flex-start',
      textAlign: next ? 'right' : 'left',
      textDecoration: 'none',
      color: 'var(--fg-1)',
      padding: compact ? '24px 0' : '40px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexDirection: next ? 'row-reverse' : 'row',
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: next ? 'arrow-right' : 'arrow-left',
    size: 16,
    style: {
      transform: hover ? `translateX(${next ? 4 : -4}px)` : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }), label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'baseline',
      flexDirection: next ? 'row-reverse' : 'row'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: '.12em',
      color: 'var(--fg-1)'
    }
  }, item.number), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-light) ${compact ? '20px' : 'clamp(24px, 2.6vw, 36px)'}/1.15 var(--font-sans)`,
      letterSpacing: '-.01em',
      textDecoration: hover ? 'underline' : 'none',
      textDecorationThickness: '1px',
      textUnderlineOffset: 6,
      textWrap: 'balance'
    }
  }, item.title)));
}

/** Previous / next project at the foot of a project page. */
function ProjectPager({
  prev,
  next,
  prevLabel = 'Proiectul anterior',
  nextLabel = 'Proiectul următor',
  compact = false,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Proiecte",
    style: {
      display: 'grid',
      gridTemplateColumns: compact ? '1fr' : '1fr 1fr',
      borderTop: '1px solid var(--line)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Side, {
    item: prev,
    label: prevLabel,
    dir: -1,
    compact: compact
  }), /*#__PURE__*/React.createElement("div", {
    style: compact ? {
      borderTop: '1px solid var(--line)'
    } : {
      borderLeft: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement(Side, {
    item: next,
    label: nextLabel,
    dir: 1,
    compact: compact
  })));
}
Object.assign(__ds_scope, { ProjectPager });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ProjectPager.jsx", error: String((e && e.message) || e) }); }

// components/site/Reveal.jsx
try { (() => {
/** Fades + rises its children in once they scroll into view. Honours reduced motion. */
function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 900,
  once = true,
  disabled = false,
  as = 'div',
  style
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(disabled);
  React.useEffect(() => {
    if (disabled) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        if (once) io.disconnect();
      } else if (!once) setShown(false);
    }, {
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.06
    });
    io.observe(el);
    return () => io.disconnect();
  }, [disabled, once]);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : `translateY(${y}px)`,
      transition: `opacity ${duration}ms var(--ease-out) ${delay}ms, transform ${duration}ms var(--ease-out) ${delay}ms`,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Reveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Reveal.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteFooter.jsx
try { (() => {
/** Minimal footer: name + faculty, link row, copyright. */
function SiteFooter({
  name,
  note,
  links = [],
  rights,
  compact = false,
  style
}) {
  const label = {
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--fg-2)'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--line)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: `${compact ? 32 : 48}px var(--frame-margin) ${compact ? 40 : 56}px`,
      display: 'grid',
      gridTemplateColumns: compact ? '1fr' : 'minmax(0,1fr) auto',
      gap: compact ? 24 : 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) 15px/1.3 var(--font-sans)'
    }
  }, name), note && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--fg-2)'
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: compact ? 'flex-start' : 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: compact ? '4px 20px' : '4px 28px'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href + l.label,
    href: l.href,
    download: l.download,
    style: {
      ...label,
      color: 'var(--fg-1)',
      textDecoration: 'none',
      padding: '10px 0'
    }
  }, l.label))), rights && /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      fontSize: 10
    }
  }, rights))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LABEL = {
  font: 'var(--text-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase'
};
function NavLink({
  href,
  active,
  children,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    "aria-current": active ? 'page' : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...LABEL,
      display: 'inline-flex',
      alignItems: 'center',
      height: 'var(--hit-min)',
      padding: '0 10px',
      textDecoration: 'none',
      color: active || hover ? 'var(--fg-1)' : 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      paddingBottom: 4,
      borderBottom: active ? '1px solid currentColor' : '1px solid transparent'
    }
  }, children));
}

/** Site header: name (home link) left, nav + RO/EN right. compact = phone with full-screen menu. */
function SiteHeader({
  name,
  sub,
  homeHref = '#/',
  links = [],
  lang,
  onLangChange,
  compact = false,
  menuLabel = 'Meniu',
  closeLabel = 'Închide',
  menuFooter,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener('scroll', f, {
      passive: true
    });
    return () => window.removeEventListener('scroll', f);
  }, []);
  React.useEffect(() => {
    if (!compact) setOpen(false);
  }, [compact]);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const k = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', k);
    };
  }, [open]);
  const h = compact ? 64 : 72;
  const brand = /*#__PURE__*/React.createElement("a", {
    href: homeHref,
    onClick: () => setOpen(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      textDecoration: 'none',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) 15px/1 var(--font-sans)',
      letterSpacing: '.01em'
    }
  }, name), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      ...LABEL,
      fontSize: 10,
      color: 'var(--fg-2)'
    }
  }, sub));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'var(--surface-page)',
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      transition: 'border-color var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      maxWidth: 1440,
      margin: '0 auto',
      padding: '0 var(--frame-margin)'
    }
  }, brand, compact ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "menu",
    label: menuLabel,
    onClick: () => setOpen(true),
    style: {
      marginRight: -10
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, _extends({
    key: l.href
  }, l), l.label))), onLangChange && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 18,
      background: 'var(--line-strong)',
      margin: '0 12px'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.LanguageToggle, {
    value: lang,
    onChange: onLangChange
  }))))), compact && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'var(--surface-page)',
      display: 'grid',
      gridTemplateRows: `${h}px 1fr auto`,
      padding: '0 var(--frame-margin) calc(24px + env(safe-area-inset-bottom))',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, brand, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: closeLabel,
    onClick: () => setOpen(false),
    style: {
      marginRight: -10
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderTop: '1px solid var(--line)'
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: () => setOpen(false),
    "aria-current": l.active ? 'page' : undefined,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 16,
      padding: '18px 0',
      borderBottom: '1px solid var(--line)',
      textDecoration: 'none',
      color: 'var(--fg-1)',
      transform: open ? 'none' : 'translateY(12px)',
      transition: `transform var(--dur-slow) var(--ease-out) ${60 * i}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...LABEL,
      color: 'var(--fg-2)',
      width: 24
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `${l.active ? 'var(--weight-regular)' : 'var(--weight-light)'} 40px/1.1 var(--font-sans)`,
      letterSpacing: '-.015em'
    }
  }, l.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      paddingTop: 16
    }
  }, onLangChange && /*#__PURE__*/React.createElement(__ds_scope.LanguageToggle, {
    value: lang,
    onChange: onLangChange,
    style: {
      marginLeft: -6
    }
  }), menuFooter)));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/AboutPage.jsx
try { (() => {
function AboutPage({
  lang,
  mobile,
  base,
  motion
}) {
  const {
    Reveal,
    Button
  } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO,
    c = P.copy[lang],
    a = c.about,
    U = window.SiteUI;
  const grid = {
    display: 'grid',
    gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0,1fr))',
    columnGap: 24,
    rowGap: 24
  };
  const rows = [[a.email, P.contact.email], [a.phone, P.contact.phone], [a.social, P.contact.social], [a.linkedin, P.contact.linkedin]];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "About"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      ...grid,
      padding: `${mobile ? 48 : 112}px var(--frame-margin) 0`
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      gridColumn: mobile ? 'auto' : '1 / span 3'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...U.label,
      color: 'var(--fg-1)'
    }
  }, a.label)), /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    delay: 80,
    style: {
      gridColumn: mobile ? 'auto' : '4 / span 8',
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 24 : 36
    }
  }, /*#__PURE__*/React.createElement(U.Display, {
    size: mobile ? 'clamp(40px, 11vw, 52px)' : 'clamp(56px, 6vw, 96px)'
  }, P.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '32ch',
      font: `var(--weight-light) ${mobile ? '22px' : 'clamp(24px, 2.2vw, 32px)'}/1.3 var(--font-sans)`,
      letterSpacing: '-.01em',
      textWrap: 'pretty'
    }
  }, a.lead), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '60ch',
      font: 'var(--weight-regular) 16px/1.7 var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(U.Ph, null, a.bio)))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      ...grid,
      padding: `${mobile ? 64 : 128}px var(--frame-margin) ${mobile ? 72 : 160}px`
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      gridColumn: mobile ? 'auto' : '1 / span 3'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...U.label,
      color: 'var(--fg-1)'
    }
  }, a.contact)), /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    delay: 80,
    style: {
      gridColumn: mobile ? 'auto' : '4 / span 6',
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      borderTop: '1px solid var(--line)'
    }
  }, rows.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '96px minmax(0,1fr)' : '160px minmax(0,1fr)',
      gap: 16,
      padding: '16px 0',
      borderBottom: '1px solid var(--line)',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: U.label
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      font: `var(--weight-light) ${mobile ? 17 : 20}px/1.35 var(--font-sans)`,
      overflowWrap: 'anywhere'
    }
  }, /*#__PURE__*/React.createElement(U.Val, {
    v: v
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexDirection: mobile ? 'column' : 'row',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "download",
    href: base + P.pdf,
    download: P.pdfName,
    style: mobile ? {
      justifyContent: 'center'
    } : null
  }, a.pdf), /*#__PURE__*/React.createElement(Button, {
    iconAfter: "arrow-right",
    href: "#/carte/1",
    style: mobile ? {
      justifyContent: 'center'
    } : null
  }, a.book)))));
}
Object.assign(window, {
  AboutPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/AboutPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/HomePage.jsx
try { (() => {
function HomePage({
  lang,
  mobile,
  base,
  motion
}) {
  const {
    Button,
    Icon
  } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO,
    c = P.copy[lang],
    U = window.SiteUI;
  const [loaded, setLoaded] = React.useState(false);
  const imgStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: mobile ? '30% 40%' : '50% 42%',
    opacity: loaded ? 1 : 0,
    transform: loaded || !motion ? 'scale(1)' : 'scale(1.04)',
    transition: 'opacity 1200ms var(--ease-out), transform 2600ms var(--ease-out)'
  };
  const image = /*#__PURE__*/React.createElement("img", {
    src: U.img(base, '02-randare-exterior'),
    alt: c.home.credit,
    onLoad: () => setLoaded(true),
    style: imgStyle
  });
  const credit = /*#__PURE__*/React.createElement("a", {
    href: "#/proiecte/casa",
    style: {
      ...U.label,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--fg-2)',
      textDecoration: 'none',
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "02"), c.home.credit, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 14
  }));
  const text = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 16 : 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: U.label
  }, c.home.kicker), /*#__PURE__*/React.createElement(U.Display, {
    size: mobile ? 'clamp(44px, 12.5vw, 60px)' : 'clamp(56px, 6.4vw, 104px)'
  }, P.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: `var(--weight-light) ${mobile ? 16 : 19}px/1.45 var(--font-sans)`,
      color: 'var(--fg-2)'
    }
  }, c.faculty, /*#__PURE__*/React.createElement("br", null), c.city), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: mobile ? 8 : 12,
      flexDirection: mobile ? 'column' : 'row',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconAfter: "arrow-right",
    href: "#/carte/1",
    style: mobile ? {
      justifyContent: 'space-between'
    } : null
  }, c.home.browse), /*#__PURE__*/React.createElement(Button, {
    href: "#/proiecte",
    style: mobile ? {
      justifyContent: 'center'
    } : null
  }, c.home.projects)));
  if (mobile) {
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": "Home",
      style: {
        minHeight: 'calc(100svh - 64px)',
        display: 'grid',
        gridTemplateRows: 'minmax(300px, 52svh) auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--surface-sunken)'
      }
    }, image), /*#__PURE__*/React.createElement("div", {
      style: {
        ...U.wrap,
        padding: '32px var(--frame-margin) 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28
      }
    }, text, credit));
  }
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Home",
    style: {
      position: 'relative',
      height: 'calc(100svh - 72px)',
      minHeight: 620,
      overflow: 'hidden',
      background: 'var(--surface-sunken)'
    }
  }, image, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 'min(760px, 56%)',
      background: 'var(--surface-page)',
      padding: '48px var(--frame-margin) 40px 56px',
      display: 'flex',
      flexDirection: 'column',
      gap: 36,
      opacity: loaded || !motion ? 1 : 0,
      transform: loaded || !motion ? 'none' : 'translateY(24px)',
      transition: 'opacity 900ms var(--ease-out) 300ms, transform 900ms var(--ease-out) 300ms'
    }
  }, text, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--line)',
      paddingTop: 16
    }
  }, credit)));
}
Object.assign(window, {
  HomePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/ProjectPage.jsx
try { (() => {
function ProjectMeta({
  p,
  lang,
  c,
  mobile
}) {
  const U = window.SiteUI,
    P = window.PORTFOLIO;
  const rows = [[c.project.discipline, p.discipline[lang]], [c.project.year, P.year], p.place ? [c.project.place, p.place] : null, p.team ? [c.project.team, p.team] : null, [c.project.inBook, U.pagesLabel(p, c)]].filter(Boolean);
  return /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr 1fr' : '1fr',
      columnGap: 24,
      borderTop: '1px solid var(--line)'
    }
  }, rows.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '120px minmax(0,1fr)',
      gap: mobile ? 4 : 16,
      padding: '12px 0',
      borderBottom: '1px solid var(--line)',
      gridColumn: Array.isArray(v) && mobile ? '1 / -1' : 'auto'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: U.label
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      font: 'var(--weight-regular) 14px/1.45 var(--font-sans)'
    }
  }, Array.isArray(v) ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-2)'
    }
  }, c.project.teamNote), v.map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, /*#__PURE__*/React.createElement(U.Val, {
    v: n
  })))) : v))));
}
function ProjectGroup({
  g,
  lang,
  c,
  mobile,
  base,
  motion,
  onOpen
}) {
  const {
    Reveal,
    Figure
  } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const U = window.SiteUI;
  const wide = it => it.w / it.h > 2.2;
  const three = !mobile && g.items.length === 3 && !g.items.some(wide);
  const cols = mobile ? '1fr' : three ? 'repeat(3, minmax(0,1fr))' : 'repeat(2, minmax(0,1fr))';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      paddingTop: mobile ? 64 : 128
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderTop: '1px solid var(--line-strong)',
      paddingTop: 16,
      marginBottom: mobile ? 28 : 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...U.label,
      color: 'var(--fg-1)'
    }
  }, c.project.groups[g.type]), /*#__PURE__*/React.createElement("span", {
    style: U.label
  }, U.pad(g.items.length))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      columnGap: mobile ? 0 : 48,
      rowGap: mobile ? 44 : 88,
      alignItems: 'end'
    }
  }, g.items.map((it, j) => {
    const full = !mobile && (g.items.length === 1 || wide(it));
    return /*#__PURE__*/React.createElement(Reveal, {
      key: it.key,
      disabled: !motion,
      delay: mobile ? 0 : j % (three ? 3 : 2) * 120,
      style: {
        gridColumn: full ? '1 / -1' : 'auto',
        display: 'flex',
        justifyContent: full && g.items.length === 1 ? 'center' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Figure, {
      src: U.img(base, it.key),
      width: it.w,
      height: it.h,
      caption: it.cap[lang],
      onOpen: () => onOpen(it.key)
    }));
  })));
}
function ProjectPage({
  id,
  lang,
  mobile,
  base,
  motion
}) {
  const {
    Reveal,
    Lightbox,
    Button,
    ProjectPager,
    Icon
  } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO,
    c = P.copy[lang],
    U = window.SiteUI;
  const n = P.projects.length;
  const idx = Math.max(0, P.projects.findIndex(x => x.id === id));
  const p = P.projects[idx];
  const prev = P.projects[(idx - 1 + n) % n],
    next = P.projects[(idx + 1) % n];
  const all = [p.hero, ...p.groups.flatMap(g => g.items)].filter(Boolean);
  const [lb, setLb] = React.useState(-1);
  const open = key => setLb(all.findIndex(it => it.key === key));
  const concept = p.concept ? p.concept[lang] : null;
  const toPager = x => ({
    href: `#/proiecte/${x.id}`,
    number: x.number,
    title: x.title[lang]
  });
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": `Project ${p.number}`
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      padding: `${mobile ? 28 : 56}px var(--frame-margin) ${mobile ? 40 : 88}px`
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/proiecte",
    style: {
      ...U.label,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      textDecoration: 'none',
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), c.project.back), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0,1fr))',
      columnGap: 24,
      rowGap: 40,
      alignItems: 'end',
      marginTop: mobile ? 24 : 72
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      gridColumn: mobile ? 'auto' : '1 / span 8',
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 16 : 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...U.label,
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-1)'
    }
  }, p.number), p.discipline[lang]), /*#__PURE__*/React.createElement(U.Display, {
    size: mobile ? 'clamp(40px, 11vw, 52px)' : 'clamp(56px, 6.6vw, 112px)'
  }, p.title[lang]), p.subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: `var(--weight-light) ${mobile ? 18 : 24}px/1.35 var(--font-sans)`,
      color: 'var(--fg-2)'
    }
  }, p.subtitle[lang])), /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    delay: 120,
    style: {
      gridColumn: mobile ? 'auto' : '9 / span 4'
    }
  }, /*#__PURE__*/React.createElement(ProjectMeta, {
    p: p,
    lang: lang,
    c: c,
    mobile: mobile
  })))), p.hero && /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    y: 0,
    duration: 1200
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLb(0),
    "aria-label": p.hero.cap[lang],
    style: {
      display: 'block',
      width: '100%',
      padding: 0,
      border: 0,
      background: 'var(--surface-sunken)',
      cursor: 'zoom-in'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: U.img(base, p.hero.key),
    alt: p.hero.cap[lang],
    style: {
      width: '100%',
      height: mobile ? 'auto' : 'min(86vh, 70vw)',
      aspectRatio: mobile ? String(p.hero.w / p.hero.h) : 'auto',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...U.wrap,
      paddingTop: 14,
      font: 'var(--text-caption)',
      color: 'var(--fg-2)'
    }
  }, p.hero.cap[lang])), concept && /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      paddingTop: mobile ? 56 : 128,
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0,1fr))',
      columnGap: 24,
      rowGap: 24
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      gridColumn: mobile ? 'auto' : '1 / span 3'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...U.label,
      color: 'var(--fg-1)'
    }
  }, c.project.concept)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: mobile ? 'auto' : '4 / span 9',
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 28 : 48
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '30ch',
      font: `var(--weight-light) ${mobile ? '22px' : 'clamp(26px, 2.5vw, 36px)'}/1.3 var(--font-sans)`,
      letterSpacing: '-.01em',
      textWrap: 'pretty'
    }
  }, concept[0])), /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    delay: 120,
    style: {
      columnCount: mobile ? 1 : 2,
      columnGap: 48,
      maxWidth: 1000
    }
  }, concept.slice(1).map((t, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: '0 0 1.1em',
      font: 'var(--weight-regular) 16px/1.7 var(--font-sans)',
      color: 'var(--fg-1)',
      textWrap: 'pretty',
      breakInside: 'avoid-column'
    }
  }, t))))), p.groups.map(g => /*#__PURE__*/React.createElement(ProjectGroup, {
    key: g.type,
    g: g,
    lang: lang,
    c: c,
    mobile: mobile,
    base: base,
    motion: motion,
    onOpen: open
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      paddingTop: mobile ? 72 : 160,
      paddingBottom: mobile ? 56 : 96
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      display: 'flex',
      flexDirection: mobile ? 'column' : 'row',
      alignItems: mobile ? 'stretch' : 'center',
      justifyContent: 'space-between',
      gap: 24,
      padding: mobile ? '32px 0' : '48px 0',
      borderTop: '1px solid var(--line-strong)',
      borderBottom: '1px solid var(--line-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: U.label
  }, c.project.inBook), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-light) ${mobile ? 28 : 40}px/1.1 var(--font-sans)`,
      letterSpacing: '-.015em'
    }
  }, U.pagesLabel(p, c))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconAfter: "arrow-right",
    href: `#/carte/${p.pages[0]}`,
    style: mobile ? {
      justifyContent: 'space-between'
    } : null
  }, c.project.openBook)), /*#__PURE__*/React.createElement(ProjectPager, {
    prev: toPager(prev),
    next: toPager(next),
    prevLabel: c.project.prev,
    nextLabel: c.project.next,
    compact: mobile,
    style: {
      borderTop: 0,
      marginTop: mobile ? 8 : 24
    }
  })), /*#__PURE__*/React.createElement(Lightbox, {
    items: all.map(it => ({
      src: U.img(base, it.key),
      caption: it.cap[lang]
    })),
    index: Math.max(0, lb),
    open: lb >= 0,
    onClose: () => setLb(-1),
    labels: c.lightbox
  }));
}
Object.assign(window, {
  ProjectPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/ProjectPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/ProjectsPage.jsx
try { (() => {
const PROJECTS_EDITORIAL = [{
  col: '1 / span 6',
  aspect: '5 / 4',
  mt: 0
}, {
  col: '8 / span 5',
  aspect: '4 / 5',
  mt: 160
}, {
  col: '2 / span 6',
  aspect: '3 / 2',
  mt: 0
}, {
  col: '9 / span 4',
  aspect: '1 / 1',
  mt: 240
}, {
  col: '4 / span 6',
  aspect: '16 / 10',
  mt: 0
}];
function ProjectsPage({
  lang,
  mobile,
  base,
  motion,
  grid
}) {
  const {
    ProjectCard,
    Reveal
  } = window.BudeIoanaNicolaPortofoliuDS_69cab2;
  const P = window.PORTFOLIO,
    c = P.copy[lang],
    U = window.SiteUI;
  const editorial = !mobile && grid === 'editorial';
  const cols = mobile ? '1fr' : editorial ? 'repeat(12, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))';
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Projects"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      padding: `${mobile ? 48 : 112}px var(--frame-margin) ${mobile ? 48 : 120}px`,
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(12, minmax(0, 1fr))',
      columnGap: 24,
      rowGap: 32,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    style: {
      gridColumn: mobile ? 'auto' : '1 / span 7',
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 16 : 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: U.label
  }, c.list.kicker), /*#__PURE__*/React.createElement(U.Display, {
    size: mobile ? '48px' : 'clamp(64px, 8vw, 128px)'
  }, c.list.title)), !mobile && /*#__PURE__*/React.createElement(Reveal, {
    disabled: !motion,
    delay: 120,
    as: "ol",
    style: {
      gridColumn: '9 / span 4',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid var(--line)'
    }
  }, P.projects.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.id,
    style: {
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `#/proiecte/${p.id}`,
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1fr',
      alignItems: 'baseline',
      padding: '12px 0',
      textDecoration: 'none',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...U.label,
      color: 'var(--fg-1)'
    }
  }, p.number), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) 14px/1.35 var(--font-sans)'
    }
  }, p.title[lang])))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...U.wrap,
      display: 'grid',
      gridTemplateColumns: cols,
      columnGap: 24,
      rowGap: mobile ? 56 : editorial ? 128 : 80,
      paddingBottom: mobile ? 80 : 176
    }
  }, P.projects.map((p, i) => {
    const L = editorial ? PROJECTS_EDITORIAL[i] : null;
    const aspect = L ? L.aspect : mobile ? p.id === 'casa' ? '4 / 5' : '4 / 3' : '4 / 3';
    return /*#__PURE__*/React.createElement(Reveal, {
      key: p.id,
      disabled: !motion,
      delay: !mobile && !editorial ? i % 3 * 120 : 0,
      style: {
        gridColumn: L ? L.col : 'auto',
        marginTop: L ? L.mt : 0
      }
    }, /*#__PURE__*/React.createElement(ProjectCard, {
      href: `#/proiecte/${p.id}`,
      image: U.img(base, p.cover),
      aspect: aspect,
      number: p.number,
      title: p.title[lang],
      discipline: p.discipline[lang],
      badge: p.team ? c.project.teamNote : undefined
    }));
  })));
}
Object.assign(window, {
  ProjectsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/ProjectsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/Reader.jsx
try { (() => {
const RDS = window.BudeIoanaNicolaPortofoliuDS_69cab2;
function currentSection(sections, page) {
  return sections.reduce((acc, s) => page >= s.page ? s : acc, null);
}
function ReaderHeader({
  lang,
  setLang,
  page,
  onHome,
  mobile
}) {
  const {
    LanguageToggle
  } = RDS;
  const P = window.PORTFOLIO,
    s = currentSection(P.sections[lang], page);
  const label = {
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--fg-2)'
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr auto' : '1fr auto 1fr',
      alignItems: 'center',
      height: 64,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onHome,
    style: {
      justifySelf: 'start',
      background: 'transparent',
      border: 0,
      padding: '8px 0',
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) 14px/1 var(--font-sans)'
    }
  }, P.name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      fontSize: 10
    }
  }, P.short)), !mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      display: 'flex',
      gap: 12,
      minHeight: 14,
      opacity: s ? 1 : 0,
      transition: 'opacity var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-1)'
    }
  }, s && s.number), /*#__PURE__*/React.createElement("span", null, s && s.title)), /*#__PURE__*/React.createElement(LanguageToggle, {
    value: lang,
    onChange: setLang,
    style: {
      justifySelf: 'end'
    }
  }));
}
function Reader({
  lang,
  setLang,
  page,
  setPage,
  onHome,
  layout,
  isFs,
  toggleFs,
  base
}) {
  const {
    FlipBook,
    Toolbar,
    TableOfContents
  } = RDS;
  const P = window.PORTFOLIO,
    c = P.copy[lang];
  const [toc, setToc] = React.useState(false);
  const spread = layout === 'spread';
  const s = p => Math.floor(p / 2);
  const range = spread ? [s(page) * 2 || null, s(page) * 2 + 1 <= P.total ? s(page) * 2 + 1 : null] : undefined;
  const prev = () => setPage(spread ? Math.max(1, 2 * (s(page) - 1)) : Math.max(1, page - 1));
  const next = () => setPage(spread ? Math.min(P.total, 2 * (s(page) + 1)) : Math.min(P.total, page + 1));
  const canNext = spread ? s(page) < s(P.total) : page < P.total;
  const ratio = (spread ? 2 : 1) * P.aspect;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Reader",
    style: {
      height: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto minmax(0,1fr) auto',
      padding: '0 var(--frame-margin)',
      background: 'var(--surface-page)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(ReaderHeader, {
    lang: lang,
    setLang: setLang,
    page: page,
    onHome: onHome
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `min(100%, calc((100vh - 64px - 96px - 32px) * ${ratio}))`
    }
  }, /*#__PURE__*/React.createElement(FlipBook, {
    pages: P.pages(base),
    page: page,
    onPageChange: setPage,
    mode: layout,
    aspect: P.aspect,
    keyboard: !toc,
    altPrefix: c.page
  }))), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 96
    }
  }, /*#__PURE__*/React.createElement(Toolbar, {
    page: page,
    total: P.total,
    range: range,
    onPrev: prev,
    onNext: next,
    canPrev: page > 1,
    canNext: canNext,
    onContents: () => setToc(true),
    contentsOpen: toc,
    onFullscreen: toggleFs,
    isFullscreen: isFs,
    downloadHref: base + P.pdf,
    downloadName: P.pdfName,
    labels: c.toolbar
  })), /*#__PURE__*/React.createElement(TableOfContents, {
    sections: P.sections[lang],
    currentPage: page,
    title: c.contents,
    closeLabel: c.close,
    placement: "right",
    open: toc,
    onClose: () => setToc(false),
    onSelect: p => {
      setToc(false);
      setPage(p);
    }
  }));
}
function useViewport() {
  const get = () => ({
    w: window.innerWidth,
    h: window.innerHeight
  });
  const [vp, setVp] = React.useState(get);
  React.useEffect(() => {
    const f = () => setVp(get());
    window.addEventListener('resize', f);
    window.addEventListener('orientationchange', f);
    return () => {
      window.removeEventListener('resize', f);
      window.removeEventListener('orientationchange', f);
    };
  }, []);
  return vp;
}
function useBox(ref) {
  const [box, setBox] = React.useState({
    w: 0,
    h: 0
  });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setBox({
      w: el.clientWidth,
      h: el.clientHeight
    });
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return box;
}

/* Phone reader. Portrait: header, page, caption, toolbar. Landscape (phone turned): no header — page fills the height, one slim bar below. The page is sized to fit both dimensions of the free area. */
function MobileReader({
  lang,
  setLang,
  page,
  setPage,
  onHome,
  base
}) {
  const {
    SwipeViewer,
    Toolbar,
    TableOfContents,
    LanguageToggle
  } = RDS;
  const P = window.PORTFOLIO,
    c = P.copy[lang];
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
  const change = p => {
    setSwiped(true);
    setPage(p);
  };
  const toolbar = /*#__PURE__*/React.createElement(Toolbar, {
    compact: true,
    page: page,
    total: P.total,
    onPrev: () => change(Math.max(1, page - 1)),
    onNext: () => change(Math.min(P.total, page + 1)),
    canPrev: page > 1,
    canNext: page < P.total,
    onContents: () => setToc(true),
    contentsOpen: toc,
    downloadHref: base + P.pdf,
    downloadName: P.pdfName,
    labels: c.toolbar
  });
  const label = {
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--fg-2)'
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Reader \u2014 mobile",
    style: {
      height: '100dvh',
      display: 'grid',
      gridTemplateRows: landscape ? 'minmax(0,1fr) auto' : 'auto minmax(0,1fr) auto',
      gridTemplateColumns: 'minmax(0,1fr)',
      background: 'var(--surface-page)',
      overflow: 'hidden'
    }
  }, !landscape && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement(ReaderHeader, {
    lang: lang,
    setLang: setLang,
    page: page,
    onHome: onHome,
    mobile: true
  })), /*#__PURE__*/React.createElement("main", {
    ref: mainRef,
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 0,
      minWidth: 0,
      overflow: 'hidden',
      gap: landscape ? 0 : 24,
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)'
    }
  }, /*#__PURE__*/React.createElement(SwipeViewer, {
    key: Math.round(box.w) + (landscape ? 'l' : 'p'),
    pages: P.pages(base),
    page: page,
    onPageChange: change,
    aspect: P.aspect,
    gap: gap,
    altPrefix: c.page
  }), !landscape && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      minHeight: 44,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, sec ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      color: 'var(--fg-1)'
    }
  }, sec.number), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) 15px/1.35 var(--font-sans)'
    }
  }, sec.title, sec.subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-2)'
    }
  }, " \u2014 ", sec.subtitle) : null)) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--fg-2)',
      opacity: swiped ? 0 : 1,
      transition: 'opacity var(--dur-slow)',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, c.swipeHint), /*#__PURE__*/React.createElement("span", null, c.rotateHint)))), landscape ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 12,
      borderTop: '1px solid var(--line)',
      padding: '0 max(20px, env(safe-area-inset-right)) env(safe-area-inset-bottom) max(20px, env(safe-area-inset-left))'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onHome,
    style: {
      justifySelf: 'start',
      background: 'transparent',
      border: 0,
      padding: '8px 0',
      minHeight: 44,
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-regular) 13px/1 var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, P.name), sec && /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      fontSize: 10
    }
  }, sec.number)), toolbar, /*#__PURE__*/React.createElement(LanguageToggle, {
    value: lang,
    onChange: setLang,
    style: {
      justifySelf: 'end'
    }
  })) : /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      borderTop: '1px solid var(--line)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }
  }, toolbar), /*#__PURE__*/React.createElement(TableOfContents, {
    sections: P.sections[lang],
    currentPage: page,
    title: c.contents,
    closeLabel: c.close,
    placement: "bottom",
    open: toc,
    onClose: () => setToc(false),
    onSelect: p => {
      setToc(false);
      change(p);
    }
  }));
}
Object.assign(window, {
  Reader,
  MobileReader,
  ReaderHeader,
  currentSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/Reader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/StartScreen.jsx
try { (() => {
const SDS = window.BudeIoanaNicolaPortofoliuDS_69cab2;
function StartScreen({
  lang,
  setLang,
  onOpen,
  mobile,
  base
}) {
  const {
    Button,
    LanguageToggle
  } = SDS;
  const P = window.PORTFOLIO,
    c = P.copy[lang];
  const [hover, setHover] = React.useState(false);
  const cover = /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onOpen(1),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": c.open,
    style: {
      padding: 0,
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      width: '100%',
      display: 'block',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: P.pages(base)[0],
    alt: c.kicker,
    style: {
      width: '100%',
      aspectRatio: String(P.aspect),
      display: 'block',
      objectFit: 'cover',
      boxShadow: 'var(--shadow-book)',
      background: '#fff'
    }
  }));
  const label = {
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--fg-2)'
  };
  const text = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 20 : 28,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: label
  }, c.kicker, " \xB7 ", c.year), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: `var(--weight-light) ${mobile ? 'clamp(40px, 12vw, 52px)' : 'clamp(48px, 5.6vw, 84px)'}/1.04 var(--font-sans)`,
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--fg-1)',
      textWrap: 'balance'
    }
  }, P.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: `var(--weight-light) ${mobile ? 16 : 18}px/1.5 var(--font-sans)`,
      color: 'var(--fg-2)'
    }
  }, c.faculty, /*#__PURE__*/React.createElement("br", null), c.city), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: mobile ? 4 : 12,
      flexDirection: mobile ? 'column' : 'row'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconAfter: "arrow-right",
    onClick: () => onOpen(1),
    style: mobile ? {
      justifyContent: 'space-between'
    } : null
  }, c.open), /*#__PURE__*/React.createElement(Button, {
    icon: "download",
    href: base + P.pdf,
    download: P.pdfName,
    style: mobile ? {
      justifyContent: 'center'
    } : null
  }, c.download)));
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Start",
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      padding: `0 var(--frame-margin)`,
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 64
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      color: 'var(--fg-1)'
    }
  }, P.short), /*#__PURE__*/React.createElement(LanguageToggle, {
    value: lang,
    onChange: setLang
  })), mobile ? /*#__PURE__*/React.createElement("main", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 36,
      padding: '16px 0 48px'
    }
  }, cover, text) : /*#__PURE__*/React.createElement("main", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)',
      gap: 'clamp(40px, 6vw, 112px)',
      alignItems: 'center',
      paddingBottom: 64
    }
  }, text, cover));
}
Object.assign(window, {
  StartScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/StartScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/data.js
try { (() => {
/* Portfolio content: pages, projects, bilingual copy. Plain script; sets window.PORTFOLIO. Pass base = path to project root. */
(function () {
  function pages(base) {
    var out = [];
    for (var i = 1; i <= 15; i++) out.push(base + 'assets/pages/page-' + String(i).padStart(2, '0') + '.jpg');
    return out;
  }
  var D = {
    "01-plan-situatie": [767, 601],
    "01-plan-parter": [619, 823],
    "01-plan-etaj": [407, 745],
    "01-fatada": [804, 418],
    "01-sectiune-long": [758, 431],
    "01-fatada-trans": [702, 379],
    "01-sectiune-trans": [739, 405],
    "01-schite": [850, 1242],
    "01-macheta-interior": [444, 614],
    "01-macheta-sit": [564, 503],
    "02-plan-situatie": [832, 758],
    "02-axonometrie": [416, 1033],
    "02-plan-parter": [804, 431],
    "02-plan-etaj": [776, 392],
    "02-sectiune": [647, 372],
    "02-sectiune-fatada": [896, 372],
    "02-fatada-strada": [1848, 320],
    "02-macheta": [998, 1307],
    "02-randare-exterior": [1848, 1307],
    "02-randare-coridor": [508, 340],
    "02-randare-curte": [564, 340],
    "02-randare-sala": [517, 340],
    "03-colaj": [1109, 954],
    "03-randare-living": [1848, 1307],
    "04-plan-actual": [499, 497],
    "04-plan-propus": [499, 510],
    "04-profil-actual": [582, 392],
    "04-profil-propus": [748, 529],
    "05-macheta-1": [869, 510],
    "05-macheta-2": [869, 516],
    "05-detaliu-1": [785, 523],
    "05-detaliu-2": [785, 510]
  };
  function im(key, ro, en) {
    return {
      key: key,
      cap: {
        ro: ro,
        en: en
      },
      w: D[key][0],
      h: D[key][1]
    };
  }
  var projects = [{
    id: 'moigrad',
    number: '01',
    pages: [3, 6],
    cover: '01-macheta-sit',
    title: {
      ro: 'Moigrad Porolissum',
      en: 'Moigrad Porolissum'
    },
    subtitle: {
      ro: 'Inserție în așezare rurală',
      en: 'Insertion in a rural settlement'
    },
    discipline: {
      ro: 'Proiectare de arhitectură 3',
      en: 'Architectural Design 3'
    },
    place: 'Moigrad Porolissum',
    concept: {
      ro: ['Satul Moigrad se dezvoltă pe un relief fragmentat, cu pante line și zone în trepte care dictează modul de amplasare a locuințelor.', 'Volumetriile caselor sunt în general simple și compacte, adaptate topografiei prin fundații minimale și orientări care urmăresc panta naturală. Trama satului este influențată de curgerea terenului, drumurile urmărind direcțiile naturale ale văilor și culmilor.', 'Gospodăriile se așază adesea paralel cu linia de nivel, pentru a asigura stabilitate și o relație firească cu peisajul. Această topografie variată oferă perspective valoroase, motiv pentru care construcțiile sunt orientate către deschideri vizuale și fragmente de natură.', 'Proiectul propune o abordare modulară ce derivă din rigoarea simetrică a caselor tradiționale din Moigrad și logica defensivă a Castrului Roman de la Porolissum, adaptându-se organic reliefului fragmentat. Volumetriile simple și compacte urmează direcțiile naturale ale văilor, orientarea fiind gândită pentru a integra panoramele în experiența locuirii. Ospitalitatea devine un pilon central, terasa frontală funcționând ca o extensie care „îmbrățișează” vizitatorul și marchează gestul primirii.', 'Compoziția nu se rezumă la un obiect singular, ci se transformă într-un dialog între volume; corpul principal și anexa definesc împreună o curte interioară protejată, replicând cu sensibilitate structura fragmentată a gospodăriilor tradiționale și oferind o experiență a locuirii ancorată în spiritul locului. În contrast cu rigoarea unghiurilor drepte, fereastra circulară devine un punct focal esențial — un „ochi” simbolic ce veghează Măgura Moigradului, ancorând discret locuința în profunzimea peisajului de la Moigrad.'],
      en: ['The village of Moigrad unfolds over fragmented terrain, with gentle slopes and stepped ground that dictate how houses are placed.', 'House volumes are generally simple and compact, adapted to the topography through minimal foundations and orientations that follow the natural slope. The village fabric is shaped by the flow of the land, its roads tracing the natural lines of valleys and ridges.', 'Households are often set parallel to the contour lines, ensuring stability and a natural relationship with the landscape. This varied topography offers valuable views, which is why buildings are oriented towards visual openings and fragments of nature.', 'The project proposes a modular approach derived from the symmetrical rigour of Moigrad’s traditional houses and the defensive logic of the Roman fort at Porolissum, adapting organically to the fragmented relief. Simple, compact volumes follow the natural direction of the valleys, oriented to bring the panoramas into the experience of dwelling. Hospitality becomes a central pillar: the front terrace acts as an extension that “embraces” the visitor and marks the gesture of welcome.', 'The composition is not a single object but a dialogue between volumes; the main house and the annex together define a sheltered inner courtyard, sensitively echoing the fragmented structure of traditional households and offering a way of living anchored in the spirit of the place. Against the rigour of right angles, the circular window becomes an essential focal point — a symbolic “eye” watching over Măgura Moigradului, quietly anchoring the house in the depth of the Moigrad landscape.']
    },
    groups: [{
      type: 'plans',
      items: [im('01-plan-situatie', 'Plan de situație', 'Site plan'), im('01-schite', 'Schițe de studiu', 'Study sketches'), im('01-plan-parter', 'Plan parter', 'Ground floor plan'), im('01-plan-etaj', 'Plan etaj', 'Upper floor plan')]
    }, {
      type: 'sections',
      items: [im('01-fatada', 'Fațadă longitudinală', 'Long elevation'), im('01-sectiune-long', 'Secțiune longitudinală', 'Long section'), im('01-fatada-trans', 'Fațadă transversală', 'Cross elevation'), im('01-sectiune-trans', 'Secțiune transversală', 'Cross section')]
    }, {
      type: 'models',
      items: [im('01-macheta-interior', 'Machetă — interior', 'Model — interior'), im('01-macheta-sit', 'Machetă de sit', 'Site model')]
    }]
  }, {
    id: 'casa',
    number: '02',
    pages: [7, 11],
    cover: '02-macheta',
    title: {
      ro: 'Concursul CASA',
      en: 'CASA competition'
    },
    subtitle: null,
    discipline: {
      ro: 'Proiectare de arhitectură 4',
      en: 'Architectural Design 4'
    },
    place: 'Strada Kossuth',
    team: ['Bude Ioana Nicola', '[Nume coechipier]', '[Nume coechipier]'],
    hero: im('02-randare-exterior', 'Randare exterioară', 'Exterior render'),
    concept: {
      ro: ['În centrul designului nostru se află o admirație profundă pentru natură, pe care o percepem ca fiind prima formă de muzică. Cu mult înainte de apariția oricărui instrument, fenomenele meteorologice și sunetele vieții sălbatice au compus acea partitură primordială care ne-a inspirat să creăm.', 'Acest concept conturează esența proiectului: un mediu cald în care studenții se pot simți complet liberi și în largul lor. Astfel, sălile de repetiție se deschid către curtea interioară, oferind un dialog vizual neîntrerupt cu natura, conceput pentru a susține actul muzical.', 'La nivel urban, ansamblul propune o conexiune fluidă între Strada Kossuth și parc, orchestrată printr-o compoziție simetrică. Perspectivele cu un singur punct de fugă ghidează pașii trecătorilor, conferind spațiului o coerență vizuală și o frumusețe atemporală.', 'Din punct de vedere formal, conceptul este ancorat în verticalitate, făcând ecou proporțiilor clădirilor istorice învecinate. Această rigoare se materializează prin stâlpi masivi, transformând curtea într-un spațiu protejat – un refugiu urban permeabil și deschis.'],
      en: ['At the heart of our design lies a deep admiration for nature, which we perceive as the first form of music. Long before any instrument existed, weather and the sounds of wildlife composed the primordial score that inspired us to create.', 'This idea shapes the essence of the project: a warm environment in which students can feel entirely free and at ease. The rehearsal rooms open onto the inner courtyard, offering an uninterrupted visual dialogue with nature, designed to support the act of making music.', 'At the urban scale, the ensemble proposes a fluid connection between Kossuth Street and the park, orchestrated through a symmetrical composition. Single-point perspectives guide passers-by, giving the space visual coherence and a timeless beauty.', 'Formally, the concept is anchored in verticality, echoing the proportions of the neighbouring historic buildings. This rigour takes shape in massive piers, turning the courtyard into a protected space — a permeable, open urban refuge.']
    },
    groups: [{
      type: 'plans',
      items: [im('02-plan-situatie', 'Plan de situație', 'Site plan'), im('02-axonometrie', 'Diagramă funcțională', 'Programme diagram'), im('02-plan-parter', 'Plan parter', 'Ground floor plan'), im('02-plan-etaj', 'Plan etaj', 'Upper floor plan')]
    }, {
      type: 'sections',
      items: [im('02-sectiune', 'Secțiune', 'Section'), im('02-sectiune-fatada', 'Secțiune și fațadă', 'Section and elevation'), im('02-fatada-strada', 'Desfășurare stradală', 'Street elevation')]
    }, {
      type: 'models',
      items: [im('02-macheta', 'Machetă', 'Model')]
    }, {
      type: 'renders',
      items: [im('02-randare-coridor', 'Galeria spre curte', 'Gallery to the courtyard'), im('02-randare-curte', 'Curtea interioară', 'Inner courtyard'), im('02-randare-sala', 'Sală de repetiție', 'Rehearsal room')]
    }]
  }, {
    id: 'ambient',
    number: '03',
    pages: [12, 13],
    cover: '03-randare-living',
    title: {
      ro: 'Colecții',
      en: 'Collections'
    },
    subtitle: null,
    discipline: {
      ro: 'Ambient',
      en: 'Interior design'
    },
    hero: im('03-randare-living', 'Randare interior', 'Interior render'),
    concept: null,
    groups: [{
      type: 'collage',
      items: [im('03-colaj', 'Colaj', 'Collage')]
    }]
  }, {
    id: 'urbanism',
    number: '04',
    pages: [14, 14],
    cover: '04-plan-propus',
    title: {
      ro: 'Bazele proiectării de urbanism',
      en: 'Fundamentals of urban design'
    },
    subtitle: null,
    discipline: {
      ro: 'Lucrări opționale',
      en: 'Elective work'
    },
    concept: null,
    groups: [{
      type: 'plans',
      items: [im('04-plan-actual', 'Plan — situația existentă', 'Plan — existing'), im('04-plan-propus', 'Plan — propunere', 'Plan — proposal')]
    }, {
      type: 'sections',
      items: [im('04-profil-actual', 'Profil transversal actual', 'Existing street profile'), im('04-profil-propus', 'Profil transversal propus', 'Proposed street profile')]
    }]
  }, {
    id: 'constructii',
    number: '05',
    pages: [15, 15],
    cover: '05-macheta-1',
    title: {
      ro: 'Elemente de construcții',
      en: 'Building elements'
    },
    subtitle: null,
    discipline: {
      ro: 'Acoperiș — machetă și detalii',
      en: 'Roof — model and details'
    },
    concept: null,
    groups: [{
      type: 'models',
      items: [im('05-macheta-1', 'Machetă — structura acoperișului', 'Model — roof structure'), im('05-macheta-2', 'Machetă — șarpantă', 'Model — roof framing')]
    }, {
      type: 'details',
      items: [im('05-detaliu-1', 'Detaliu — învelitoare', 'Detail — roof covering'), im('05-detaliu-2', 'Detaliu — coamă', 'Detail — ridge')]
    }]
  }];
  var sections = {
    ro: [{
      number: '01',
      title: 'Proiectare de arhitectură 3',
      subtitle: 'Inserție în așezare rurală, Moigrad Porolissum',
      page: 3
    }, {
      number: '02',
      title: 'Proiectare de arhitectură 4',
      subtitle: 'Concursul CASA',
      page: 7
    }, {
      number: '03',
      title: 'Ambient',
      subtitle: 'Colecții',
      page: 12
    }, {
      number: '04',
      title: 'Lucrări opționale',
      subtitle: 'Bazele proiectării de urbanism',
      page: 14
    }, {
      number: '05',
      title: 'Elemente de construcții',
      page: 15
    }],
    en: [{
      number: '01',
      title: 'Architectural Design 3',
      subtitle: 'Rural insertion, Moigrad Porolissum',
      page: 3
    }, {
      number: '02',
      title: 'Architectural Design 4',
      subtitle: 'CASA competition',
      page: 7
    }, {
      number: '03',
      title: 'Interior',
      subtitle: 'Collections',
      page: 12
    }, {
      number: '04',
      title: 'Elective work',
      subtitle: 'Fundamentals of urban design',
      page: 14
    }, {
      number: '05',
      title: 'Building elements',
      page: 15
    }]
  };
  var copy = {
    ro: {
      kicker: 'Portofoliu studențesc',
      year: 'Anul 2 · 2025–2026',
      faculty: 'Facultatea de Arhitectură și Urbanism',
      city: 'Cluj-Napoca',
      open: 'Deschide portofoliul',
      contents: 'Cuprins',
      download: 'Descarcă PDF',
      close: 'Închide',
      page: 'Pagina',
      swipeHint: 'Glisează pentru a răsfoi',
      rotateHint: 'Rotește telefonul pentru pagini mai mari',
      keysHint: '← → pentru a răsfoi',
      toolbar: {
        prev: 'Înapoi',
        next: 'Înainte',
        contents: 'Cuprins',
        fullscreen: 'Ecran complet',
        exitFullscreen: 'Ieși din ecran complet',
        download: 'Descarcă PDF'
      },
      nav: {
        projects: 'Proiecte',
        book: 'Carte',
        about: 'Despre',
        menu: 'Meniu'
      },
      home: {
        kicker: 'Portofoliu de arhitectură · 2025–2026',
        browse: 'Răsfoiește portofoliul',
        projects: 'Vezi proiectele',
        credit: 'Concursul CASA — randare exterioară'
      },
      list: {
        title: 'Proiecte',
        kicker: 'Anul 2 · 2025–2026',
        index: 'Index'
      },
      project: {
        back: 'Toate proiectele',
        discipline: 'Disciplină',
        year: 'An academic',
        place: 'Loc',
        team: 'Echipă',
        teamNote: 'Proiect de echipă',
        inBook: 'În carte',
        pages: 'Paginile',
        pageSingle: 'Pagina',
        concept: 'Concept',
        openBook: 'Vezi în carte',
        prev: 'Proiectul anterior',
        next: 'Proiectul următor',
        groups: {
          plans: 'Planșe',
          sections: 'Secțiuni',
          models: 'Machete',
          renders: 'Randări',
          details: 'Detalii',
          collage: 'Colaj'
        }
      },
      lightbox: {
        close: 'Închide',
        prev: 'Imaginea anterioară',
        next: 'Imaginea următoare'
      },
      about: {
        label: 'Despre',
        lead: 'Studentă în anul 2 la Facultatea de Arhitectură și Urbanism din Cluj-Napoca, grupa 1121.',
        bio: '[Câteva rânduri despre interesele și felul tău de a lucra — de completat.]',
        contact: 'Contact',
        email: 'Email',
        phone: 'Telefon',
        social: 'Instagram',
        linkedin: 'LinkedIn',
        portfolio: 'Portofoliu',
        pdf: 'Descarcă PDF',
        book: 'Răsfoiește cartea'
      },
      footer: {
        rights: '© 2026 Bude Ioana Nicola'
      }
    },
    en: {
      kicker: 'Student portfolio',
      year: 'Year 2 · 2025–2026',
      faculty: 'Faculty of Architecture and Urbanism',
      city: 'Cluj-Napoca',
      open: 'Open portfolio',
      contents: 'Contents',
      download: 'Download PDF',
      close: 'Close',
      page: 'Page',
      swipeHint: 'Swipe to browse',
      rotateHint: 'Turn your phone sideways for larger pages',
      keysHint: '← → to turn pages',
      toolbar: {
        prev: 'Previous',
        next: 'Next',
        contents: 'Contents',
        fullscreen: 'Full screen',
        exitFullscreen: 'Exit full screen',
        download: 'Download PDF'
      },
      nav: {
        projects: 'Projects',
        book: 'Book',
        about: 'About',
        menu: 'Menu'
      },
      home: {
        kicker: 'Architecture portfolio · 2025–2026',
        browse: 'Browse the portfolio',
        projects: 'See the projects',
        credit: 'CASA competition — exterior render'
      },
      list: {
        title: 'Projects',
        kicker: 'Year 2 · 2025–2026',
        index: 'Index'
      },
      project: {
        back: 'All projects',
        discipline: 'Course',
        year: 'Academic year',
        place: 'Location',
        team: 'Team',
        teamNote: 'Team project',
        inBook: 'In the book',
        pages: 'Pages',
        pageSingle: 'Page',
        concept: 'Concept',
        openBook: 'View in the book',
        prev: 'Previous project',
        next: 'Next project',
        groups: {
          plans: 'Drawings',
          sections: 'Sections',
          models: 'Models',
          renders: 'Renders',
          details: 'Details',
          collage: 'Collage'
        }
      },
      lightbox: {
        close: 'Close',
        prev: 'Previous image',
        next: 'Next image'
      },
      about: {
        label: 'About',
        lead: 'Second-year student at the Faculty of Architecture and Urbanism, Cluj-Napoca, group 1121.',
        bio: '[A few lines about your interests and the way you work — to be completed.]',
        contact: 'Contact',
        email: 'Email',
        phone: 'Phone',
        social: 'Instagram',
        linkedin: 'LinkedIn',
        portfolio: 'Portfolio',
        pdf: 'Download PDF',
        book: 'Browse the book'
      },
      footer: {
        rights: '© 2026 Bude Ioana Nicola'
      }
    }
  };
  window.PORTFOLIO = {
    name: 'Bude Ioana Nicola',
    short: 'FAU Cluj-Napoca',
    total: 15,
    aspect: 842 / 595,
    year: '2025–2026',
    pdf: 'assets/portofoliu-bude-ioana-nicola.pdf',
    pdfName: 'Bude_Ioana_Nicola_Portofoliu.pdf',
    contact: {
      email: '[adresa@email.ro]',
      phone: '[+40 7xx xxx xxx]',
      social: '[@utilizator]',
      linkedin: '[linkedin.com/in/…]'
    },
    pages: pages,
    projects: projects,
    sections: sections,
    copy: copy
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-site/ui.jsx
try { (() => {
/* Shared helpers for the site screens. */
const SiteUI = (() => {
  const label = {
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--fg-2)'
  };
  const wrap = {
    width: '100%',
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 var(--frame-margin)'
  };
  const pad = n => String(n).padStart(2, '0');
  const img = (base, key) => `${base}assets/projects/${key}.jpg`;
  const isPh = v => typeof v === 'string' && /^\[.*\]$/.test(v);
  function pagesLabel(p, c) {
    const [a, b] = p.pages;
    return a === b ? `${c.project.pageSingle} ${pad(a)}` : `${c.project.pages} ${pad(a)}–${pad(b)}`;
  }
  function Ph({
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      title: "De completat / to be completed",
      style: {
        color: 'var(--fg-2)',
        borderBottom: '1px dashed var(--line-strong)',
        paddingBottom: 1
      }
    }, children);
  }
  function Val({
    v
  }) {
    return isPh(v) ? /*#__PURE__*/React.createElement(Ph, null, v) : /*#__PURE__*/React.createElement(React.Fragment, null, v);
  }
  function Display({
    children,
    size,
    as = 'h1',
    style
  }) {
    const Tag = as;
    return /*#__PURE__*/React.createElement(Tag, {
      style: {
        margin: 0,
        font: `var(--weight-light) ${size}/1.02 var(--font-sans)`,
        letterSpacing: '-.025em',
        color: 'var(--fg-1)',
        textWrap: 'balance',
        ...style
      }
    }, children);
  }
  return {
    label,
    wrap,
    pad,
    img,
    isPh,
    pagesLabel,
    Ph,
    Val,
    Display
  };
})();
Object.assign(window, {
  SiteUI
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-site/ui.jsx", error: String((e && e.message) || e) }); }

__ds_ns.FlipBook = __ds_scope.FlipBook;

__ds_ns.PageCounter = __ds_scope.PageCounter;

__ds_ns.SwipeViewer = __ds_scope.SwipeViewer;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.LanguageToggle = __ds_scope.LanguageToggle;

__ds_ns.TableOfContents = __ds_scope.TableOfContents;

__ds_ns.Toolbar = __ds_scope.Toolbar;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.Lightbox = __ds_scope.Lightbox;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.ProjectPager = __ds_scope.ProjectPager;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
