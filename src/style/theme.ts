import { DefaultTheme } from 'styled-components';

const color = {
  primary: '#4F75FF',
  skyblue: '#3B82F6',
  background: '#F3F4F6',
  black: '#202124',
  white: '#F2F2F2',
} as const;

export type ColorTypes = typeof color;

const theme: DefaultTheme = {
  color,
};

export default theme;
