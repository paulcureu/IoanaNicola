import * as React from 'react';

export interface SiteLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface SiteHeaderProps {
  /** Full name, surname first. */
  name: string;
  /** Small tracked line under the name, e.g. "FAU Cluj-Napoca". */
  sub?: string;
  homeHref?: string;
  links?: SiteLink[];
  lang?: string;
  /** Omit to hide the RO/EN toggle. */
  onLangChange?: (lang: string) => void;
  /** Phone: menu button → full-screen menu. */
  compact?: boolean;
  menuLabel?: string;
  closeLabel?: string;
  /** Extra node at the bottom of the phone menu (e.g. PDF button). */
  menuFooter?: React.ReactNode;
  style?: React.CSSProperties;
}

export function SiteHeader(props: SiteHeaderProps): JSX.Element;
