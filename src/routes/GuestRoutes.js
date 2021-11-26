import Login from 'pages/Login';
import ConfirmReset from 'pages/Login/ConfirmReset';
import ForgotPassword from 'pages/Login/ForgotPassword';

const guestRoutes = [
  {
    path: '/login',
    exact: true,
    page: () => <Login />,
  },
  {
    path: '/forgot-password',
    exact: true,
    page: () => <ForgotPassword />,
  },
  {
    path: '/reset-password/:username',
    exact: true,
    page: () => <ConfirmReset />,
  },
];
export { guestRoutes };
