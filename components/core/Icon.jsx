import React from 'react';

const LUCIDE = 'https://unpkg.com/lucide-static@0.460.0/icons/';
const cache = new Map();

function load(name) {
  if (!cache.has(name)) {
    cache.set(name, fetch(LUCIDE + name + '.svg').then(r => (r.ok ? r.text() : '')).catch(() => ''));
  }
  return cache.get(name);
}

/** Lucide icon (CDN), re-stroked thin to match the hairline frame. */
export function Icon({ name, size = 20, strokeWidth = 1.25, style, className }) {
  const [svg, setSvg] = React.useState('');
  React.useEffect(() => {
    let live = true;
    load(name).then(t => { if (live) setSvg(t); });
    return () => { live = false; };
  }, [name]);
  const html = svg
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`)
    .replace(/stroke-width="2"/, `stroke-width="${strokeWidth}"`)
    .replace(/class="[^"]*"/, '');
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: 'inline-flex', width: size, height: size, flex: 'none', color: 'currentColor', lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
