import * as React from 'react';

export interface LightboxItem {
  src: string;
  caption?: string;
}

export interface LightboxProps {
  items: LightboxItem[];
  /** Index to open at. */
  index?: number;
  open?: boolean;
  onClose?: () => void;
  onIndexChange?: (index: number) => void;
  /** Override aria copy: close, prev, next. */
  labels?: Partial<Record<'close' | 'prev' | 'next', string>>;
  style?: React.CSSProperties;
}

export function Lightbox(props: LightboxProps): JSX.Element | null;
