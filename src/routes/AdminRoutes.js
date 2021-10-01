import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import Dashboard from 'pages/Dashboard';
import { RiDashboardLine } from 'react-icons/ri';

const adminRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <Dashboard />,
  },
];

const menuItems = {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: 'Dashboard',
        icon: <AppstoreOutlined />,
        component: './dashboard',
      },
    ],
  },
};
export { adminRoutes, menuItems };
