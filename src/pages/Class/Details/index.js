import { Breadcrumb, Card, Tabs } from 'antd';
import AntCalendar from 'components/Class/AntCalendar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { classState$ } from 'redux/selectors';
import CustomCalendar from '../../../components/Class/CustomCalendar';
import AddAppoint from '../AddAppoint';

const { TabPane } = Tabs;
const Details = () => {
  const { idClass } = useParams();
  const [className, setClassName] = useState('');
  const { data: classes } = useSelector(classState$);

  useEffect(() => {
    if (idClass) {
      let classRoom = classes.find(classRoom => {
        return classRoom.idClass == idClass;
      });
      if (classRoom) {
        setClassName(classRoom.className);
      }
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
      <h3>{className}</h3>
      <Card>
        <Tabs defaultActiveKey="1">
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
      </Card>
    </div>
  );
};

export default Details;
