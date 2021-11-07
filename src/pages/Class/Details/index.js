import React from 'react';
import { Tabs, Breadcrumb } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import AddAppoint from '../AddAppoint';
import EditableTable from '../../../components/common/EditableTable';

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
        <TabPane tab="Students" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Details;
