import { Avatar, Badge, Image, Popover } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/actions/users';
import { userState$ } from 'redux/selectors';
import Content from './Content/index.js';
import Title from './Title/index.js';

const RightContent = () => {
  const idUser = localStorage.getItem('idUser');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser.getUserRequest(idUser));
  }, [dispatch]);
  const user = useSelector(userState$);
  return (
    <div>
      <Popover placement="bottomRight" content={<Content />} title={<Title />} trigger="hover">
        <Badge dot>
          <Avatar
            src={
              !user.imageUrl ? (
                <Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />
              ) : (
                <Image src={user.imageUrl} style={{ width: 32 }} />
              )
            }
          />
        </Badge>
      </Popover>
    </div>
  );
};

export default RightContent;
