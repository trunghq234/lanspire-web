import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import Dashboard from 'pages/Dashboard';
import lecturerIcon from 'assets/svg/lecturer.svg';
import courseIcon from 'assets/svg/course.svg';
import Lecturer from 'pages/Lecturer';
import AddLecturer from 'pages/Lecturer/AddLecturer';
import Course from 'pages/Course';
import AddCourse from 'pages/Course/AddCourse';
import TypeOfCourse from 'pages/Course/TypeOfCourse';
import AddTypeOfCourse from 'pages/Course/AddTypeOfCourse';

const PandaIcon = props => <Icon component={svg} {...props} />;
import Employee from 'pages/Employee';
import AddEmployee from 'pages/Employee/AddEmployee';

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
    path: '/course',
    exact: true,
    page: () => <Course />,
  },
  {
    path: '/course/add',
    exact: true,
    page: () => <AddCourse />,
  },
  {
    path: '/course/typeofcourse',
    exact: true,
    page: () => <TypeOfCourse />,
  },
  {
    path: '/course/addtypeofcourse',
    exact: true,
    page: () => <AddTypeOfCourse />,
  },
  {
    path: '/employee/',
    exact: true,
    page: () => <Employee />,
  },
  {
    path: '/employee/add',
    exact: true,
    page: () => <AddEmployee />,
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
      name: 'Course',
      icon: courseIcon,
      routes: [
        {
          path: '/course/',
          name: 'Course list',
          component: <Course />,
        },
        {
          path: '/course/add',
          name: 'Add Course',
          component: <AddCourse />,
        },
        {
          path: '/course/typeofcourse',
          name: 'Type Of Course',
          component: <TypeOfCourse />,
        },
        {
          path: '/course/addtypeofcourse',
          name: 'Add Type Of Course',
          exact: true,
          component: <AddTypeOfCourse />,
      name: 'Employee',
      icon: lecturerIcon,
      routes: [
        {
          path: '/employee/',
          name: 'Employee list',
          component: <Employee />,
        },
        {
          path: '/employee/add',
          name: 'Add Employee',
          component: <AddEmployee />,
        },
      ],
    },
  ],
};
export { adminRoutes, adminMenuItems };
