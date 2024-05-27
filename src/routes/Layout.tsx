import { Outlet } from 'react-router-dom';
import HeaderNavigation from '../components/HeaderNavigation';

function Layout() {
  return (
    <>
      <HeaderNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
