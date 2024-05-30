import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
