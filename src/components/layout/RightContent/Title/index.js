import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { userState$ } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { avatarUrl } from 'constant/imageUrl';

const Title = () => {
  const user = useSelector(userState$);
  return (
    <div>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Col span={7}>
          <Avatar
            shape="square"
            src={
              !user.imageUrl ? (
                <img alt="avatar" src={avatarUrl} style={{ width: 32 }} />
              ) : (
                <img alt="avatar" src={user.imageUrl} style={{ width: 32 }} />
              )
            }
          />
        </Col>
        <Col span={17}>
          <p style={{ fontSize: '16px', marginBottom: '0' }}>{user.displayName}</p>
          <p
            style={{
              color: 'rgba(114,132,154,.7)',
              fontSize: '14px',
              marginBottom: '4px',
            }}>
            {user?.Role?.name}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Title;
