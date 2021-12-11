import Class from 'pages/Class';
import AddClass from 'pages/Class/AddClass';
import ClassDetails from 'pages/Class/ClassDetails';
import Course from 'pages/Course';
import AddCourse from 'pages/Course/AddCourse';
import CourseDetails from 'pages/Course/CourseDetails';
import Dashboard from 'pages/Dashboard';
import Employee from 'pages/Employee';
import AddEmployee from 'pages/Employee/AddEmployee';
import ColumnTranscript from 'pages/Expand/ColumnTranscript';
import CourseType from 'pages/Expand/CourseType';
import Level from 'pages/Expand/Level';
import TimeFrame from 'pages/Expand/TimeFrame';
import Invoice from 'pages/Invoice';
import InvoiceDetails from 'pages/Invoice/InvoiceDetails';
import Lecturer from 'pages/Lecturer';
import AddLecturer from 'pages/Lecturer/AddLecturer';
import Profile from 'pages/Setting/Profile';
import Setting from 'pages/Setting/Setting';
import Student from 'pages/Student';
import AddStudent from 'pages/Student/AddStudent';
import StudentDetails from 'pages/Student/StudentDetails';
import ArrangeClass from 'pages/Student/StudentDetails/ArrangeClass';
import React from 'react';
import {
  CashIcon,
  ClassIcon,
  CogIcon,
  CourseIcon,
  DashboardIcon,
  ExpandIcon,
  StudentIcon,
  UserGroupIcon,
  UsersIcon,
} from 'utils/icon';

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
  {
    path: '/student/edit/:idStudent',
    exact: true,
    page: () => <AddStudent />,
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
    path: '/course/add',
    exact: true,
    page: () => <AddCourse />,
  },
  {
    path: '/course/edit/:idCourse',
    exact: true,
    page: () => <AddCourse />,
  },
  {
    path: '/course/details/:idCourse',
    exact: true,
    page: () => <CourseDetails />,
  },
  {
    path: '/coursetype/',
    exact: true,
    page: () => <CourseType />,
  },
  {
    path: '/coursetype/:idCourseType',
    exact: true,
    page: () => <CourseType />,
  },
  {
    path: '/level/',
    exact: true,
    page: () => <Level />,
  },
  {
    path: '/level/:idLevel',
    exact: true,
    page: () => <Level />,
  },
  {
    path: '/lecturer/edit/:id',
    exact: true,
    page: () => <AddLecturer />,
  },
  {
    path: '/columntranscript',
    exact: true,
    page: () => <ColumnTranscript />,
  },
  {
    path: '/columntranscript/:idColumn',
    exact: true,
    page: () => <ColumnTranscript />,
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
  {
    path: '/time-frame',
    exact: true,
    page: () => <TimeFrame />,
  },
  {
    path: '/class/',
    exact: true,
    page: () => <Class />,
  },
  {
    path: '/class/add',
    exact: true,
    page: () => <AddClass />,
  },
  {
    path: '/class/edit/:idClass',
    exact: true,
    page: () => <AddClass />,
  },
  {
    path: '/class/details/:idClass',
    exact: true,
    page: () => <ClassDetails />,
  },
  {
    path: '/employee/edit/:id',
    exact: true,
    page: () => <AddEmployee />,
  },
  {
    path: '/setting/',
    exact: true,
    page: () => <Setting />,
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

const adminMenuItems = {
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
      name: 'Employees',
      icon: <UsersIcon />,
      path: '/employee/',
      component: <Employee />,
    },
    {
      name: 'Expand',
      icon: <ExpandIcon />,
      routes: [
        {
          path: '/coursetype/',
          name: 'Course type',
          component: <CourseType />,
        },
        {
          path: '/level/',
          name: 'Level',
          component: <Level />,
        },
        {
          path: '/columntranscript/',
          name: 'Column transcript',
          component: <ColumnTranscript />,
        },
        {
          path: '/time-frame/',
          name: 'Time frame',
          component: <TimeFrame />,
        },
      ],
    },
    {
      path: '/invoice',
      name: 'Invoices',
      icon: <CashIcon />,
      component: <Invoice />,
    },
    {
      name: 'Setting',
      icon: <CogIcon />,
      routes: [
        {
          path: '/profile/',
          name: 'Profile',
          component: <Profile />,
        },
        {
          path: '/setting/',
          name: 'Setting',
          component: <Setting />,
        },
      ],
    },
  ],
};
export { adminRoutes, adminMenuItems };
