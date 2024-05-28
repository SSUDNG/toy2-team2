import { createGlobalStyle } from 'styled-components';
import PretendardExtraBoldWoff2 from './Pretendard-ExtraBold.woff2';
import PretendardBoldWoff2 from './Pretendard-Bold.woff2';
import PretendardSemiBoldWoff2 from './Pretendard-SemiBold.woff2';
import PretendardMediumWoff2 from './Pretendard-Medium.woff2';
import PretendardRegularWoff2 from './Pretendard-Regular.woff2';
import PretendardExtraBoldWoff from './Pretendard-ExtraBold.woff';
import PretendardBoldWoff from './Pretendard-Bold.woff';
import PretendardSemiBoldWoff from './Pretendard-SemiBold.woff';
import PretendardMediumWoff from './Pretendard-Medium.woff';
import PretendardRegularWoff from './Pretendard-Regular.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src: local('Pretendard Bold'), url(${PretendardExtraBoldWoff2}) format('woff2'), url(${PretendardExtraBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'), url(${PretendardBoldWoff2}) format('woff2'), url(${PretendardBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard Bold'), url(${PretendardSemiBoldWoff2}) format('woff2'), url(${PretendardSemiBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: local('Pretendard Bold'), url(${PretendardMediumWoff2}) format('woff2'), url(${PretendardMediumWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }
`;
