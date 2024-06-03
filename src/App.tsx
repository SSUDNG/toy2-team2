import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import theme from './style/theme';
import GlobalStyle from './style/global';
import GlobalFont from './style/font';
import { eventsReducer } from './modules/calendar';
import router from './routes';

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
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
