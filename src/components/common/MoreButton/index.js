import React from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { EyeOutlined, MoreOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less';

const MoreButton = () => {
  function handleButtonClick(e) {
    message.info('Click on left button.');
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.');
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<EyeOutlined />}>
        View Details
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="dropdown">
      <Dropdown.Button
        className="dropdown-btn"
        onClick={handleButtonClick}
        overlay={menu}
        icon={<MoreOutlined></MoreOutlined>}></Dropdown.Button>
    </div>
  );
};

export default MoreButton;
