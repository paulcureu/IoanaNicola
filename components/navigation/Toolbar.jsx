import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
import { PageCounter } from '../book/PageCounter.jsx';
import { LanguageToggle } from './LanguageToggle.jsx';

const DEFAULT_LABELS = { prev: 'Înapoi', next: 'Înainte', contents: 'Cuprins', fullscreen: 'Ecran complet', exitFullscreen: 'Ieși din ecran complet', download: 'Descarcă PDF' };

/** Viewer controls: ‹ 03/15 › · contents · fullscreen · download · RO/EN. */
export function Toolbar({ page, total, range, onPrev, onNext, canPrev = true, canNext = true, onContents, contentsOpen = false, onFullscreen, isFullscreen = false, downloadHref, downloadName, lang, onLangChange, labels, inverse = false, compact = false, style }) {
  const t = { ...DEFAULT_LABELS, ...labels };
  const v = inverse ? 'inverse' : 'ghost';
  const sep = <span aria-hidden="true" style={{ width: 1, height: 20, background: inverse ? 'rgba(251,250,247,.24)' : 'var(--line-strong)', margin: '0 8px', flex: 'none' }} />;
  return (
    <nav aria-label="Portfolio" style={{ display: 'flex', alignItems: 'center', gap: 2, height: 'var(--toolbar-height)', ...style }}>
      <IconButton icon="arrow-left" label={t.prev} onClick={onPrev} disabled={!canPrev} variant={v} />
      <PageCounter page={page} total={total} range={range} inverse={inverse} />
      <IconButton icon="arrow-right" label={t.next} onClick={onNext} disabled={!canNext} variant={v} />
      {sep}
      {onContents && <IconButton icon="list" label={t.contents} onClick={onContents} active={contentsOpen} variant={v} />}
      {onFullscreen && !compact && <IconButton icon={isFullscreen ? 'minimize' : 'maximize'} label={isFullscreen ? t.exitFullscreen : t.fullscreen} onClick={onFullscreen} variant={v} />}
      {downloadHref && <IconButton icon="download" label={t.download} href={downloadHref} download={downloadName || true} variant={v} />}
      {onLangChange && <>{sep}<LanguageToggle value={lang} onChange={onLangChange} inverse={inverse} /></>}
    </nav>
  );
}
