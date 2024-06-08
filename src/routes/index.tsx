import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Profile from '../pages/Profile';
import Calendar from '../pages/Calendar';
import Salary from '../pages/Salary';
import Correction from '../pages/Correction';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';

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
      {
        path: 'salary',
        element: <Salary />,
      },
      {
        path: 'correction',
        element: <Correction />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
