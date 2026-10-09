import * as React from 'react';

export interface FigureProps {
  src: string;
  alt?: string;
  /** Short noun phrase, sentence case: "Plan parter", "Secțiune longitudinală". */
  caption?: string;
  /** Native pixel width — figure never renders wider than 1.1× this. */
  width?: number;
  /** Native pixel height (sets the aspect ratio). */
  height?: number;
  /** Makes the image a zoom-in button (open the Lightbox). */
  onOpen?: () => void;
  /** Height cap as CSS length. Default "82vh". */
  maxHeight?: string;
  openLabel?: string;
  style?: React.CSSProperties;
}

export function Figure(props: FigureProps): JSX.Element;
