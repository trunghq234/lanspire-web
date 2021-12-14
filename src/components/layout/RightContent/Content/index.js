import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import store from 'redux/store';
import Icon from '@ant-design/icons';
import { logOutSvg, penSvg } from 'utils/iconsvg.js';

const PenIcon = props => <Icon component={penSvg} {...props} />;
const LogOutIcon = props => <Icon component={logOutSvg} {...props} />;

const Content = props => {
  const history = useHistory();
  const logout = () => {
    if (localStorage.getItem('accessToken')) {
      store.dispatch({
        type: 'USER_LOGOUT',
      });
      localStorage.clear();
      history.push('/login');
    }
  };
  const editProfile = () => {
    history.push('/profile');
  };

  const contents = [
    {
      key: '1',
      icon: PenIcon,
      content: 'Edit Profile',
      onClick: editProfile,
    },
    {
      key: '2',
      icon: LogOutIcon,
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
  const menuRendered = renderMenu();
  return (
    <div>
      <Menu style={{ width: 180 }}>{menuRendered}</Menu>
    </div>
  );
};

export default Content;
