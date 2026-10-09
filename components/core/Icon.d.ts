import * as React from 'react';

export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "arrow-right", "maximize", "download", "list"). */
  name: string;
  /** Pixel size. Default 20. */
  size?: number;
  /** Stroke width. Default 1.25 — keep it thin. */
  strokeWidth?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon(props: IconProps): JSX.Element;
