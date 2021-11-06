import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import PersonalInfo from 'components/common/PersonalInfo';
import Uploader from 'components/common/Uploader';
import React from 'react';
import { useParams } from 'react-router';

export default function AddEmployee() {
  const { id } = useParams();

  return (
    <div>
      <Breadcrumb style={{ marginBottom: '20px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="http://localhost:3000/employee/">Employee List</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      {id ? <h3>Edited employee</h3> : <h3>Add new employee</h3>}
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Space>{/* <PersonalInfo /> */}</Space>
        </Col>
        <Col span={6}>
          <Card>
            <Uploader />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
