import ClassDetails from 'pages/Class/ClassDetails';
import LecturerClass from 'pages/LecturerClass';
import Profile from 'pages/Setting/Profile';
import LecturerTimetable from 'pages/TabTimetable';
import React from 'react';
import { CalendarIcon, HomeIcon, UserCircleIcon } from 'utils/icon';

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
    path: '/profile',
    exact: true,
    page: () => <Profile />,
  },
  {
    path: '/schedule',
    exact: true,
    page: () => <LecturerTimetable />,
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
      path: '/schedule',
      name: 'Schedule',
      icon: <CalendarIcon />,
      component: <LecturerTimetable />,
    },
    {
      name: 'Profile',
      icon: <UserCircleIcon />,
      path: '/profile',
      component: <Profile />,
    },
  ],
};

export { lecturerRoutes, lecturerMenuItems };
