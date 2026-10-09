import * as React from 'react';

export interface FlipBookProps {
  /** Ordered page image URLs (pre-rendered; never redrawn). */
  pages: string[];
  /** Controlled 1-based current page. Omit for uncontrolled. */
  page?: number;
  /** Fired with the new 1-based page when the reader clicks a half or presses ←/→. */
  onPageChange?: (page: number) => void;
  /** spread = two pages, cover alone on the right (default); single = one page at a time. */
  mode?: 'spread' | 'single';
  /** Width/height of ONE page. Default 842/595 (A4 landscape). */
  aspect?: number;
  /** Listen to ←/→ on window. Default true. */
  keyboard?: boolean;
  /** Alt-text prefix, e.g. "Pagina" / "Page". */
  altPrefix?: string;
  style?: React.CSSProperties;
}

export function FlipBook(props: FlipBookProps): JSX.Element;
