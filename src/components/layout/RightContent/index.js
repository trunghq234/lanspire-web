import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const RightContent = () => {
  return (
    <div>
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
  );
};

export default RightContent;
