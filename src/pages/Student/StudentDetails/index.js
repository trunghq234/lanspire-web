import React from 'react';
import { Tabs, Breadcrumb, Col } from 'antd';
import ArrangeClass from 'components/Student/ArrangeClass';
import TimeTable from 'components/Student/TabTimeTable';
import PersonalInfo from 'components/Student/TabPersonalInfo';
import { useParams } from 'react-router-dom';

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
          <ArrangeClass />
        </TabPane>
        <TabPane tab="Time Table" key="3">
          <TimeTable />
        </TabPane>
      </Tabs>
    </>
  );
};

export default StudentDetails;
