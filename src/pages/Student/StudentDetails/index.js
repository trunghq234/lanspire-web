import { PrinterOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Row, Tabs, Tooltip } from 'antd';
import Grade from 'components/Student/Grade';
import TabArrangeClass from 'components/Student/TabArrangeClass';
import PersonalInfo from 'components/Student/TabPersonalInfo';
import Timetable from 'components/Student/Timetable/index.js';
import TimetableToPrint from 'components/Student/TimetableToPrint';
import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const { TabPane } = Tabs;

const StudentDetails = () => {
  const timetableRef = useRef();
  const { idStudent } = useParams();

  const handlePrintTimetable = useReactToPrint({
    content: () => timetableRef.current,
  });
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/student/list">Students</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student details</Breadcrumb.Item>
      </Breadcrumb>
      <Col span={5}>
        <h3 className="heading">Student details</h3>
      </Col>
      <Tabs type="card">
        <TabPane tab="Personal" key="1">
          <PersonalInfo idStudent={idStudent} />
        </TabPane>
        <TabPane tab="Class" key="2">
          <TabArrangeClass />
        </TabPane>
        <TabPane tab="Timetable" key="3">
          <Card>
            <Row gutter={[20, 20]}>
              <Col flex="auto" />
              <Col span={4}>
                <Tooltip title="Print timetable">
                  <Button size="large" block type="primary" onClick={handlePrintTimetable}>
                    <PrinterOutlined />
                    Print
                  </Button>
                </Tooltip>
              </Col>
              <Col span={24}>
                <Timetable />
              </Col>
            </Row>
          </Card>
          <div style={{ display: 'none' }}>
            <TimetableToPrint idStudent={idStudent} ref={timetableRef} />
          </div>
        </TabPane>
        <TabPane tab="Grade" key="4">
          <Grade />
        </TabPane>
      </Tabs>
    </>
  );
};

export default StudentDetails;
