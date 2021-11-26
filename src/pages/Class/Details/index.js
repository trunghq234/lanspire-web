import { Breadcrumb, Card, Tabs } from 'antd';
import classApi from 'api/classApi';
import AntCalendar from 'components/Class/AntCalendar';
import Transcript from 'components/Class/Transcript';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { classState$ } from 'redux/selectors';
import AddAppoint from '../AddAppoint';

const { TabPane } = Tabs;
const Details = () => {
  const { idClass } = useParams();
  const [className, setClassName] = useState('');
  const { data: classes } = useSelector(classState$);

  useEffect(() => {
    classApi.getById(idClass).then(res => {
      setClassName(res.data.className);
    });
  });
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
      <h3>{className}</h3>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Appoint Lecturer" key="1">
            <AddAppoint></AddAppoint>
          </TabPane>
          <TabPane tab="Calendar" key="3">
            <AntCalendar></AntCalendar>
          </TabPane>
          <TabPane tab="Students" key="4">
            <Transcript></Transcript>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Details;
