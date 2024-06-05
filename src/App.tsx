import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './style/theme';
import GlobalStyle from './style/global';
import GlobalFont from './style/font';
import router from './routes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GlobalFont />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
