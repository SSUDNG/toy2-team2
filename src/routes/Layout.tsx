import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavbarLayout from '../components/NavbarLayout';
import { store } from '../store';

function Layout() {
  return (
    <Provider store={store}>
      <NavbarLayout />
      <main>
        <Outlet />
      </main>
    </Provider>
  );
}

export default Layout;
