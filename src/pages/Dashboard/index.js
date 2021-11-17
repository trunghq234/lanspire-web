import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { getUser } from 'redux/actions/users';
import { userState$ } from 'redux/selectors';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');
  useEffect(() => {
    dispatch(getUser.getUserRequest(idUser));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCourses.getCoursesRequest());
  }, []);
  useEffect(() => {
    dispatch(getClasses.getClassesRequest());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
