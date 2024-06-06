import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavbarLayout from '../components/NavbarLayout';
import { initializeSalaryAsync } from '../store/salaryTable';
import { initializeCorrectionAsync } from '../store/correctionTable';
import { AppDispatch } from '../store';

function Layout() {
  const userId = sessionStorage.getItem('id');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(initializeSalaryAsync(userId));
      dispatch(initializeCorrectionAsync(userId));
    }
  }, [userId, dispatch]);

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
