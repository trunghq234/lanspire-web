import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import CourseInfo from 'components/Course/CourseInfo';
import ClassesCourse from 'components/Course/ClassesCourse';
import courseApi from 'api/courseApi';

const { TabPane } = Tabs;

const CourseDetails = () => {
  const { idCourse } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    courseApi
      .getById(idCourse)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
  }, [idCourse]);

  return (
    <div>
      <h3>{course.courseName}</h3>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Information" key="1">
          <CourseInfo course={course} />
        </TabPane>
        <TabPane tab="Classes" key="2">
          <ClassesCourse idCourse={idCourse} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CourseDetails;
