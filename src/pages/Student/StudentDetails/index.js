import React from 'react';
import { Tabs, Breadcrumb, Col } from 'antd';
import PersonalInfo from 'components/Student/TabPersonalInfo';
import { useParams } from 'react-router-dom';
import TabArrangeClass from 'components/Student/TabArrangeClass';
import Timetable from 'components/Student/Timetable/index.js';
import Grade from 'components/Student/Grade';

const { TabPane } = Tabs;

const StudentDetails = () => {
  const { idStudent } = useParams();
  return (
    <>
      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <a href="/">Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/student/list">Student list</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Details student</Breadcrumb.Item>
      </Breadcrumb>
      <Col span={5}>
        <h2>Details student</h2>
      </Col>
      <Tabs type="card">
        <TabPane tab="Personal" key="1">
          <PersonalInfo idStudent={idStudent} />
        </TabPane>
        <TabPane tab="Class" key="2">
          <TabArrangeClass />
        </TabPane>
        <TabPane tab="Timetable" key="3">
          <Timetable />
        </TabPane>
        <TabPane tab="Grade" key="4">
          <Grade />
        </TabPane>
      </Tabs>
    </>
  );
};

export default StudentDetails;
