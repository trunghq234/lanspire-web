import ClassDetails from 'pages/Class/ClassDetails';
import LecturerClass from 'pages/LecturerClass';
import Profile from 'pages/Setting/Profile';
import React from 'react';
import { HomeIcon, UserCircleIcon } from 'utils/icon';

const lecturerRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <LecturerClass />,
  },
  {
    path: '/class/details/:idClass',
    exact: true,
    page: () => <ClassDetails />,
  },
  {
    path: '/profile/',
    exact: true,
    page: () => <Profile />,
  },
];

const lecturerMenuItems = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      icon: <HomeIcon />,
      component: <LecturerClass />,
    },
    {
      name: 'Profile',
      icon: <UserCircleIcon />,
      path: '/profile/',
      component: <Profile />,
    },
  ],
};

export { lecturerRoutes, lecturerMenuItems };
