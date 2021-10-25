import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Image } from 'antd';
import React from 'react';
import { userState$ } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
const Title = () => {
  const user = useSelector(userState$);
  return (
    <div>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Col span={7}>
          <Avatar
            src={
              !user.imageUrl ? (
                <Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />
              ) : (
                <Image src={user.imageUrl} style={{ width: 32 }} />
              )
            }
          />
        </Col>
        <Col span={17}>
          <p style={{ fontSize: '17px', marginBottom: '0' }}>{user.displayName}</p>
          <p style={{ color: 'rgba(114,132,154,.7)', fontSize: '14px', marginBottom: '0' }}>
            {user.Role.name}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Title;
