import React from 'react';
import Icon, { AppstoreOutlined } from '@ant-design/icons';
import Dashboard from 'pages/Dashboard';
import lecturerIcon from 'assets/svg/lecturer.svg';
import Lecturer from 'pages/Lecturer';

const PandaIcon = props => <Icon component={svg} {...props} />;

const adminRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <Dashboard />,
  },
  {
    path: '/lecturer',
    exact: true,
    page: () => <Lecturer />,
  },
];

const adminMenuItems = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      icon: <AppstoreOutlined />,
      component: <Dashboard />,
    },
    {
      path: '/lecturer',
      name: 'Lecturer',
      icon: lecturerIcon,
      component: <Lecturer />,
    },
  ],
};
export { adminRoutes, adminMenuItems };
