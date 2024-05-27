import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/global';
import GlobalFont from './style/font';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
    </ThemeProvider>
  );
}

export default App;
