import * as React from 'react';

export interface RevealProps {
  children?: React.ReactNode;
  /** ms before the reveal starts — stagger siblings by ~120ms. */
  delay?: number;
  /** Rise distance in px. Default 24. */
  y?: number;
  /** ms. Default 900. */
  duration?: number;
  /** Reveal only the first time. Default true. */
  once?: boolean;
  /** Render immediately, no animation. */
  disabled?: boolean;
  /** Wrapper tag. Default "div". */
  as?: string;
  /** Applied to the wrapper — put grid placement here. */
  style?: React.CSSProperties;
}

export function Reveal(props: RevealProps): JSX.Element;
