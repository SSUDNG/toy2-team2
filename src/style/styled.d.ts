import 'styled-components';
import {
  BarColorTypes,
  ColorTypes,
  FontSizeTypes,
  FontWeightTypes,
} from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTypes;
    barColor: BarColorTypes;
    fontSize: FontSizeTypes;
    fontWeight: FontWeightTypes;
  }
}
