import React from 'react';
import LecturerClass from 'pages/LecturerClass';
import { HomeIcon } from 'utils/icon';

const lecturerRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <LecturerClass />,
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
  ],
};
export { lecturerRoutes, lecturerMenuItems };
