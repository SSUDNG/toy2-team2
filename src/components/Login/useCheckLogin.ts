import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useCheckLogin = async () => {
  const userName = sessionStorage.getItem('id');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (userName === null) {
      navigate('/login');
    } else if (
      location.pathname === '/login' ||
      location.pathname === '/signup'
    ) {
      navigate('/');
    }
  }, [userName, navigate, location.pathname]);
};

export default useCheckLogin;
