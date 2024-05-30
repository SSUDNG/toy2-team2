import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Calendar from '../pages/Calendar';
import Salary from '../pages/Salary';
import Correction from '../pages/Correction';

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
      {},
    ],
  },
]);

export default router;
