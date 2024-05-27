import { createGlobalStyle } from 'styled-components';
import PretendardBoldWoff2 from './Pretendard-Bold.subset.woff2';
import PretendardRegularWoff2 from './Pretendard-Regular.subset.woff2';
import PretendardBoldWoff from './Pretendard-Bold.subset.woff';
import PretendardRegularWoff from './Pretendard-Regular.subset.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'), url(${PretendardBoldWoff2}) format('woff2'), url(${PretendardBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }
`;
