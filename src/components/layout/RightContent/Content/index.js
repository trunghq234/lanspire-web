import { Image, Menu, Space } from 'antd';
import { useHistory } from 'react-router';
import { LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore } from 'redux/actions/users';

import React from 'react';

const Content = props => {
  const dispatch = useDispatch();
  let history = useHistory();
  let logout = () => {
    dispatch(resetStore);
    history.replace('/login');
  };
  let editProfile = () => {};
  const contents = [
    {
      key: '1',
      icon: EditOutlined,
      content: 'Edit Profile',
      onClick: editProfile,
    },
    {
      key: '2',
      icon: LogoutOutlined,
      content: 'Log Out',
      onClick: logout,
    },
  ];
  const renderMenu = () => {
    return contents.map(content => {
      return (
        <Menu.Item
          style={{ padding: '0', fontSize: '14px' }}
          key={content.key}
          onClick={content.onClick}
          icon={<content.icon />}>
          {content.content}
        </Menu.Item>
      );
    });
  };
  let menuRendered = renderMenu();
  return (
    <div>
      <Menu style={{ width: 180 }}>{menuRendered}</Menu>
    </div>
  );
};

export default Content;
