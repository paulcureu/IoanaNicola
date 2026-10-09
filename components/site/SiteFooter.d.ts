import * as React from 'react';

export interface FooterLink {
  label: string;
  href: string;
  /** Filename/true for download links (the PDF). */
  download?: string | boolean;
}

export interface SiteFooterProps {
  name: string;
  /** Second line, e.g. faculty + city. */
  note?: string;
  links?: FooterLink[];
  /** "© 2026 Bude Ioana Nicola" */
  rights?: string;
  compact?: boolean;
  style?: React.CSSProperties;
}

export function SiteFooter(props: SiteFooterProps): JSX.Element;
