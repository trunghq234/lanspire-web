import React from 'react';
import { Avatar, Badge, Popover, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import Title from './Title/index.js';
import Content from './Content/index.js';
import { userState$ } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

const RightContent = () => {
  const user = useSelector(userState$);
  return (
    <div>
      <Popover
        placement="bottomRight"
        content={<Content />}
        title={<Title user={user} />}
        trigger="hover">
        <Badge dot>
          <Avatar
            src={
              !user.user.imageUrl ? (
                <Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />
              ) : (
                <Image src={user.user.imageUrl} style={{ width: 32 }} />
              )
            }
          />
        </Badge>
      </Popover>
    </div>
  );
};

export default RightContent;
