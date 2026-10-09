import * as React from 'react';

export interface PagerItem {
  href: string;
  number: string;
  title: string;
}

export interface ProjectPagerProps {
  prev?: PagerItem;
  next?: PagerItem;
  prevLabel?: string;
  nextLabel?: string;
  /** Stacked layout for phones. */
  compact?: boolean;
  style?: React.CSSProperties;
}

export function ProjectPager(props: ProjectPagerProps): JSX.Element;
