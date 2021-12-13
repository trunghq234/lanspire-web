import { Breadcrumb, Card, Tabs } from 'antd';
import classApi from 'api/classApi';
import AntCalendar from 'components/Class/AntCalendar';
import ClassExam from 'components/Class/ClassExam';
import ClassInformation from 'components/Class/ClassInformation';
import ClassStudent from 'components/Class/ClassStudent';
import Transcript from 'components/Class/Transcript';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddAppoint from '../AddAppoint';

const { TabPane } = Tabs;

const ClassDetails = () => {
  const { idClass } = useParams();
  const [classData, setClassData] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    if (idClass) {
      classApi
        .getById(idClass)
        .then(res => setClassData(res.data))
        .catch(err => console.log(err));
    }
  }, [idClass]);

  useEffect(() => {
    const tmp = localStorage.getItem('role');
    setRole(tmp);
  }, []);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/class">Classes</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Details</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">{classData?.className}</h3>
      <Card>
        <Tabs defaultActiveKey="0">
          <TabPane tab="Informations" key="0">
            <ClassInformation classData={classData} course={classData?.Course} />
          </TabPane>
          <TabPane tab="Calendar" key="1">
            <AntCalendar classData={classData} />
          </TabPane>
          {role !== 'employee' && (
            <TabPane tab="Transcript" key="2">
              <Transcript />
            </TabPane>
          )}
          <TabPane tab="Students" key="3">
            <ClassStudent />
          </TabPane>
          {role !== 'employee' && (
            <TabPane tab="Exam" key="4">
              <ClassExam classData={classData} />
            </TabPane>
          )}
          {role === 'admin' && (
            <TabPane tab="Appoint lecturer" key="5">
              <AddAppoint />
            </TabPane>
          )}
        </Tabs>
      </Card>
    </div>
  );
};

export default ClassDetails;
