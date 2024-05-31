import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useCheckLogin = async () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (location.pathname === '/login' && isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate, location.pathname]);
};

export default useCheckLogin;
