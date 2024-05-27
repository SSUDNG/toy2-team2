import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
