import * as React from 'react';

export interface TocSection {
  /** "01" … "05" */
  number: string;
  title: string;
  subtitle?: string;
  /** 1-based page the section opens on. */
  page: number;
}

export interface TableOfContentsProps {
  sections: TocSection[];
  /** Highlights the section containing this page. */
  currentPage?: number;
  /** Fired with the section's start page. */
  onSelect?: (page: number) => void;
  /** Heading label. Default "Cuprins". */
  title?: string;
  /** For right/bottom placements. */
  open?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  /** inline (in flow) · right (desktop side panel) · bottom (mobile sheet) */
  placement?: 'inline' | 'right' | 'bottom';
  style?: React.CSSProperties;
}

export function TableOfContents(props: TableOfContentsProps): JSX.Element;
