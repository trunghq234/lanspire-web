import { DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import React from 'react';
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
        View details
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
