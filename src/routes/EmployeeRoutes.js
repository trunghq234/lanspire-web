import Class from 'pages/Class';
import ClassDetails from 'pages/Class/ClassDetails';
import Course from 'pages/Course';
import CourseDetails from 'pages/Course/CourseDetails';
import Dashboard from 'pages/Dashboard';
import Invoice from 'pages/Invoice';
import InvoiceDetails from 'pages/Invoice/InvoiceDetails';
import Lecturer from 'pages/Lecturer';
import AddLecturer from 'pages/Lecturer/AddLecturer';
import Profile from 'pages/Setting/Profile';
import Student from 'pages/Student';
import StudentDetails from 'pages/Student/StudentDetails';
import ArrangeClass from 'pages/Student/StudentDetails/ArrangeClass';
import React from 'react';
import {
  CashIcon,
  ClassIcon,
  CourseIcon,
  DashboardIcon,
  StudentIcon,
  UserCircleIcon,
  UserGroupIcon,
} from 'utils/icon';

const employeeRoutes = [
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
    path: '/student/list',
    exact: true,
    page: () => <Student />,
  },
  {
    path: '/student/details/:idStudent',
    exact: true,
    page: () => <StudentDetails />,
  },
  {
    path: '/student/details/arrange-class/:idStudent',
    exact: true,
    page: () => <ArrangeClass />,
  },
  {
    path: '/course/',
    exact: true,
    page: () => <Course />,
  },
  {
    path: '/course/details/:idCourse',
    exact: true,
    page: () => <CourseDetails />,
  },
  {
    path: '/class/',
    exact: true,
    page: () => <Class />,
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
  {
    path: '/invoice',
    exact: true,
    page: () => <Invoice />,
  },
  {
    path: '/invoice/:idBill',
    exact: true,
    page: () => <InvoiceDetails />,
  },
];

const employeeMenuItems = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      icon: <DashboardIcon />,
      component: <Dashboard />,
    },
    {
      name: 'Courses',
      icon: <CourseIcon />,
      path: '/course/',
      component: <Course />,
    },
    {
      name: 'Classses',
      icon: <ClassIcon />,
      path: '/class/',
      component: <Class />,
    },
    {
      name: 'Students',
      icon: <StudentIcon />,
      path: '/student/list',
      component: <Student />,
    },
    {
      name: 'Lecturers',
      icon: <UserGroupIcon />,
      path: '/lecturer/',
      component: <Lecturer />,
    },
    {
      path: '/invoice',
      name: 'Invoices',
      icon: <CashIcon />,
      component: <Invoice />,
    },
    {
      name: 'Profile',
      icon: <UserCircleIcon />,
      path: '/profile/',
      component: <Profile />,
    },
  ],
};
export { employeeRoutes, employeeMenuItems };
