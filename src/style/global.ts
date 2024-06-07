import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}
  #root {
    background-color: ${(props) => props.theme.color.background};
  }
  html {
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
  }
  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    background-color: ${(props) => props.theme.color.background};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
