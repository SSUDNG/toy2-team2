import { DefaultTheme } from 'styled-components';

const color = {
  primary: '#4F75FF',
  blue: '#3B82F6',
  red: '#FA1769',
  white: '#ffffff',
  background: '#F3F4F6',
  gray: '#E2DEDE',
  black: '#202124',
  yellow: '#FFBF00',
} as const;

const fontSize = {
  title1: '2.25rem',
  title2: '1.75rem',
  title3: '1.5rem',
  title4: '1.25rem',
  title5: '1.125rem',
  body1: '1rem',
  body2: '0.875rem',
} as const;

const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
} as const;

export type ColorTypes = typeof color;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;

const theme: DefaultTheme = {
  color,
  fontSize,
  fontWeight,
};

export default theme;
