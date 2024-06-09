import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useCheckLogin = async () => {
  const userId = sessionStorage.getItem('id');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      userId !== null &&
      (location.pathname === '/login' || location.pathname === '/signup')
    ) {
      navigate('/');
    } else if (
      userId === null &&
      (location.pathname === '/' ||
        location.pathname === '/profile' ||
        location.pathname === '/salary' ||
        location.pathname === '/correction' ||
        location.pathname === '/calendar')
    ) {
      navigate('/login');
    }
  }, [userId, navigate, location.pathname]);
};

export default useCheckLogin;
