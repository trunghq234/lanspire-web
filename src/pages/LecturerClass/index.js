import { Col, Row, Spin } from 'antd';
import classApi from 'api/classApi';
import ClassCard from 'components/LecturerClass/ClassCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userState$ } from 'redux/selectors';

const LecturerClass = () => {
  // const dispatch = useDispatch();
  // const { data: classes } = useSelector(classState$);
  // const { data: user } = useSelector(userState$);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    classApi
      .getByIdLecturer('ffa66902-5f65-4399-9975-88dc3467078c')
      .then(res => {
        setClasses(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Spin tip="Loading..." spinning={isLoading} size="large">
      <h3>All classes</h3>
      <Row gutter={[20, 20]}>
        {classes.map((classData, index) => (
          <Col span={8} key={index}>
            <ClassCard classData={classData} />
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default LecturerClass;
