import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import Uploader from 'components/common/Uploader';
import LevelInfo from 'components/Lecturer/LevelInfo';
import PersonalInfo from 'components/Lecturer/PersonalInfo';
import React from 'react';

const AddLecturer = () => {
  const sizes = 48;
  return (
    <div>
      <Breadcrumb style={{ marginBottom: '20px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Add new lecturer</h3>
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={18}>
          <Space size={20} direction="vertical">
            <PersonalInfo />
            <LevelInfo />
          </Space>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Uploader />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddLecturer;
