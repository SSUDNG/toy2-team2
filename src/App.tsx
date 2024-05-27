import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import theme from './style/theme';
import GlobalStyle from './style/global';
import GlobalFont from './style/font';
import router from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
