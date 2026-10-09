import * as React from 'react';

export interface ToolbarProps {
  page: number;
  total: number;
  /** Visible spread, e.g. [2,3]. */
  range?: [number | null, number | null];
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  /** Omit to hide the contents button. */
  onContents?: () => void;
  contentsOpen?: boolean;
  /** Omit to hide the fullscreen button. */
  onFullscreen?: () => void;
  isFullscreen?: boolean;
  /** PDF URL; omit to hide download. */
  downloadHref?: string;
  downloadName?: string;
  lang?: string;
  /** Omit to hide the RO/EN toggle. */
  onLangChange?: (lang: string) => void;
  /** Override tooltip/aria copy: prev, next, contents, fullscreen, exitFullscreen, download. */
  labels?: Partial<Record<'prev' | 'next' | 'contents' | 'fullscreen' | 'exitFullscreen' | 'download', string>>;
  inverse?: boolean;
  /** Phone layout: hides fullscreen. */
  compact?: boolean;
  style?: React.CSSProperties;
}

export function Toolbar(props: ToolbarProps): JSX.Element;
