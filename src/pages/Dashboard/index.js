import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userState$ } from 'redux/selectors';
import { getUser } from 'redux/actions/users';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');
  useEffect(() => {
    dispatch(getUser.getUserRequest(idUser));
  }, [dispatch]);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
