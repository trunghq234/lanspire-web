import { Avatar, Popover } from 'antd';
import { avatarUrl } from 'constant/imageUrl.js';
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
        <Avatar
          style={{ cursor: 'pointer' }}
          shape="square"
          src={
            !user.imageUrl ? (
              <img alt="avatar" src={avatarUrl} style={{ width: 32 }} />
            ) : (
              <img alt="avatar" src={user.imageUrl} style={{ width: 32 }} />
            )
          }
        />
      </Popover>
    </div>
  );
};

export default RightContent;
