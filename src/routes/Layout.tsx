import { Outlet } from 'react-router-dom';
import NavbarLayout from '../components/NavbarLayout';

function Layout() {
  return (
    <>
      <NavbarLayout />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
