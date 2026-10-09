import * as React from 'react';

export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string;
  /** Accessible label; also shown as native tooltip. Bilingual copy is the caller's job. */
  label: string;
  onClick?: () => void;
  /** When set, renders an <a> (e.g. the PDF download). */
  href?: string;
  /** Pass a filename (or true) to make the link a download. */
  download?: string | boolean;
  /** ghost (default, on paper) · outline (hairline ring) · inverse (on dark/fullscreen) */
  variant?: 'ghost' | 'outline' | 'inverse';
  /** md = 44px hit target (default), sm = 36px for dense desktop rows only. */
  size?: 'sm' | 'md';
  disabled?: boolean;
  /** Toggled-on state (e.g. contents panel open). */
  active?: boolean;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
