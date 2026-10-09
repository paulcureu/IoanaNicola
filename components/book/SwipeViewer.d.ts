import * as React from 'react';

export interface SwipeViewerProps {
  pages: string[];
  /** Controlled 1-based page; changing it scrolls smoothly to that page. */
  page?: number;
  /** Fired once a swipe settles on a new page. */
  onPageChange?: (page: number) => void;
  /** Width/height of one page. Default 842/595. */
  aspect?: number;
  /** Horizontal breathing room per slide, px. Default 16. */
  gap?: number;
  altPrefix?: string;
  style?: React.CSSProperties;
}

export function SwipeViewer(props: SwipeViewerProps): JSX.Element;
