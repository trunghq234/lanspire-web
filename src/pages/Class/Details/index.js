import React from 'react';
import { Tabs, Breadcrumb, Calendar } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import AddAppoint from '../AddAppoint';
import CustomCalendar from '../../../components/Class/CustomCalendar';
import AntCalendar from 'components/Class/AntCalendar';

const { TabPane } = Tabs;
const Details = () => {
  function callback(key) {
    console.log(key);
  }
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
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Appoint Lecturer" key="1">
          <AddAppoint></AddAppoint>
        </TabPane>
        <TabPane tab="Calendar 1" key="2">
          <CustomCalendar></CustomCalendar>
        </TabPane>
        <TabPane tab="Calendar 2" key="3">
          <AntCalendar></AntCalendar>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Details;
