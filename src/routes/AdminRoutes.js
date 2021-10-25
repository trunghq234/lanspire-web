import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import Dashboard from 'pages/Dashboard';
import lecturerIcon from 'assets/svg/lecturer.svg';
import Lecturer from 'pages/Lecturer';
import Student from 'pages/Student';
import AddStudent from 'pages/Student/AddStudent';

const PandaIcon = props => <Icon component={svg} {...props} />;
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
  {
    path: '/student/list',
    exact: true,
    page: () => <Student />,
  },
  {
    path: '/student/add',
    exact: true,
    page: () => <AddStudent />,
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
    {
      name: 'Student',
      icon: lecturerIcon,
      routes: [
        {
          path: '/student/list',
          name: 'Student list',
          component: <Student />,
        },
        {
          path: '/student/add',
          name: 'Add student',
          component: <AddStudent />,
        },
      ],
    },
  ],
};
export { adminRoutes, adminMenuItems };
