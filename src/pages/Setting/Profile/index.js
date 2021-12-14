import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Tabs } from 'antd';
import ChangePassword from 'components/Setting/ChangePassword';
import EditProfile from 'components/Setting/EditProfile';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;
const Profile = props => {
  const [position, setPosition] = useState('left');
  useEffect(() => {
    if (screen.width < 768) {
      setPosition('top');
    }
  }, []);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Profile</h3>
      <Card>
        <Tabs tabPosition={position} moreIcon={<></>}>
          <TabPane
            tab={
              <span>
                <UserOutlined />
                Edit profile
              </span>
            }
            key="1">
            <EditProfile />
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockOutlined />
                Change password
              </span>
            }
            key="2">
            <ChangePassword />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
