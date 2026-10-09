import React from 'react';

/** Image + caption. Never upscales past its native width; capped to ~82vh tall. Click opens the lightbox. */
export function Figure({ src, alt, caption, width, height, onOpen, maxHeight = '82vh', openLabel, style }) {
  const [hover, setHover] = React.useState(false);
  const ratio = width && height ? width / height : 4 / 3;
  const w = width ? `min(100%, ${Math.round(width * 1.1)}px, calc(${maxHeight} * ${ratio.toFixed(4)}))` : '100%';
  const img = (
    <img src={src} alt={alt || caption || ''} loading="lazy" draggable={false}
      style={{ width: '100%', height: 'auto', aspectRatio: String(ratio), display: 'block', objectFit: 'cover', background: 'var(--surface-sunken)' }} />
  );
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 14, width: w, ...style }}>
      {onOpen ? (
        <button type="button" onClick={onOpen} aria-label={openLabel || caption} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{ padding: 0, border: 0, background: 'transparent', cursor: 'zoom-in', display: 'block', width: '100%', opacity: hover ? 0.92 : 1, transition: 'opacity var(--dur-base) var(--ease-out)' }}>{img}</button>
      ) : img}
      {caption && (
        <figcaption style={{ font: 'var(--text-caption)', color: hover ? 'var(--fg-1)' : 'var(--fg-2)', transition: 'color var(--dur-base)', textWrap: 'pretty' }}>{caption}</figcaption>
      )}
    </figure>
  );
}
