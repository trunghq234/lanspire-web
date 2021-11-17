import { Breadcrumb, Card, Tabs } from 'antd';
import classApi from 'api/classApi';
import AntCalendar from 'components/Class/AntCalendar';
import ClassExam from 'components/Class/ClassExam';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import CustomCalendar from '../../../components/Class/CustomCalendar';
import AddAppoint from '../AddAppoint';

const { TabPane } = Tabs;
const ClassDetails = () => {
  const { idClass } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    if (idClass) {
      classApi
        .getById(idClass)
        .then(res => setClassData(res.data))
        .catch(err => console.log(err));
    }
  }, [idClass]);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/class">Classes</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Details</Breadcrumb.Item>
      </Breadcrumb>
      <h3>{classData.className}</h3>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Appoint Lecturer" key="1">
            <AddAppoint />
          </TabPane>
          <TabPane tab="Calendar 1" key="2">
            <CustomCalendar />
          </TabPane>
          <TabPane tab="Calendar 2" key="3">
            <AntCalendar />
          </TabPane>
          <TabPane tab="Exams" key="4">
            <ClassExam classData={classData} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ClassDetails;
