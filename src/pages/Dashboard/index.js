import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { getUser } from 'redux/actions/users';
import { userState$ } from 'redux/selectors';
import ImageUploader from 'components/common/ImageUploader';
import { Card, Col, Row } from 'antd';
import FileUploader from 'components/common/FileUploader';

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
      <Row>
        <Card>
          <h3>Single image upload</h3>
          <ImageUploader />
        </Card>
        <Card>
          <h3>Multiple file upload</h3>
          <FileUploader />
        </Card>
      </Row>
    </div>
  );
};

export default Dashboard;
