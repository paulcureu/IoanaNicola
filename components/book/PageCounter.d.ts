import * as React from 'react';

export interface PageCounterProps {
  /** Current 1-based page. */
  page: number;
  total: number;
  /** Visible pages of a spread, e.g. [2, 3]; nulls allowed for single cover/back. */
  range?: [number | null, number | null];
  /** Light text for dark fullscreen. */
  inverse?: boolean;
  style?: React.CSSProperties;
}

export function PageCounter(props: PageCounterProps): JSX.Element;
