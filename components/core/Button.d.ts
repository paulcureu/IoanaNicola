import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  /** primary (filled brown — one per screen), outline (default), text (underlined), inverse (paper fill on dark), outline-inverse (light hairline on dark) */
  variant?: 'primary' | 'outline' | 'text' | 'inverse' | 'outline-inverse';
  /** Leading Lucide icon. */
  icon?: string;
  /** Trailing Lucide icon; nudges right on hover. */
  iconAfter?: string;
  onClick?: () => void;
  href?: string;
  download?: string | boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
