import { Col, Row } from 'antd';
import ClassCard from 'components/LecturerClass/ClassCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesByLecturer } from 'redux/actions/classes';
import { classState$ } from 'redux/selectors';

const LecturerClass = () => {
  const dispatch = useDispatch();
  const { data: classes, isLoading } = useSelector(classState$);

  useEffect(() => {
    dispatch(
      getClassesByLecturer.getClassesByLecturerRequest('ffa66902-5f65-4399-9975-88dc3467078c')
    );
  }, []);

  // useEffect(() => {
  //   console.log(classes);
  // }, [isLoading]);
  return (
    <div>
      <h3>All classes</h3>
      <Row gutter={[20, 20]}>
        {classes.map(classData => (
          <Col span={8} key={classData.idClass}>
            <ClassCard classData={classData} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LecturerClass;
