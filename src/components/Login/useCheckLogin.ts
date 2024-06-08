import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useCheckLogin = async () => {
  const userId = sessionStorage.getItem('id');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      (location.pathname === '/login' || location.pathname === '/signup') &&
      userId !== null
    ) {
      navigate('/');
    }
  }, [userId, navigate, location.pathname]);
};

export default useCheckLogin;
