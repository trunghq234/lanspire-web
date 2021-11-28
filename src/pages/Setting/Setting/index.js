import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, Space, Breadcrumb, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import CenterInfo from 'components/Setting/CenterInfo';
import Parameter from 'components/Setting/Parameter';

const Setting = props => {
  const [offset, setOffset] = useState(6);
  useEffect(() => {
    if (screen.width <= 768) {
      setOffset(0);
    }
  }, []);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Setting</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Setting</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={12} offset={offset}>
            <CenterInfo></CenterInfo>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} offset={offset}>
            <Parameter></Parameter>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Setting;
