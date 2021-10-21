import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import Dashboard from 'pages/Dashboard';
import lecturerIcon from 'assets/svg/lecturer.svg';
import Lecturer from 'pages/Lecturer';
import AddLecturer from 'pages/Lecturer/AddLecturer';

const adminRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <Dashboard />,
  },
  {
    path: '/lecturer/',
    exact: true,
    page: () => <Lecturer />,
  },
  {
    path: '/lecturer/add',
    exact: true,
    page: () => <AddLecturer />,
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
      name: 'Lecturer',
      icon: lecturerIcon,
      routes: [
        {
          path: '/lecturer/',
          name: 'Lecturer list',
          component: <Lecturer />,
        },
        {
          path: '/lecturer/add',
          name: 'Add Lecturer',
          component: <AddLecturer />,
        },
      ],
    },
  ],
};
export { adminRoutes, adminMenuItems };
