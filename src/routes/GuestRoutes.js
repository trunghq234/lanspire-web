import Login from 'pages/Login';

const guestRoutes = [
  {
    path: '/login',
    exact: true,
    page: () => <Login />,
  },
];
export { guestRoutes };
