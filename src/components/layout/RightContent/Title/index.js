import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Image } from 'antd';
import React from 'react';

const Title = props => {
  return (
    <div>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Col span={7}>
          <Avatar
            src={
              !props.user.user.imageUrl ? (
                <Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />
              ) : (
                <Image src={props.user.user.imageUrl} style={{ width: 32 }} />
              )
            }
          />
        </Col>
        <Col span={17}>
          <p style={{ fontSize: '17px', marginBottom: '0' }}>{props.user.user.displayName}</p>
          <p style={{ color: 'rgba(114,132,154,.7)', fontSize: '14px', marginBottom: '0' }}>
            {props.user.role}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Title;
