import React, { useEffect, useState } from 'react';
import { Tabs, Radio, Space, Breadcrumb, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import EditProfile from 'components/Setting/EditProfile';
import ChangePassword from 'components/Setting/ChangePassword';

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
        <Breadcrumb.Item>Setting</Breadcrumb.Item>
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
            <EditProfile></EditProfile>
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockOutlined />
                Change password
              </span>
            }
            key="2">
            <ChangePassword></ChangePassword>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
