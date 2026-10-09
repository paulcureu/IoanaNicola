import * as React from 'react';

export interface LanguageToggleProps {
  /** Active language code. Default "ro". */
  value?: string;
  onChange?: (lang: string) => void;
  /** Language codes, shown uppercase. Default ["ro","en"]. */
  options?: string[];
  inverse?: boolean;
  style?: React.CSSProperties;
}

export function LanguageToggle(props: LanguageToggleProps): JSX.Element;
