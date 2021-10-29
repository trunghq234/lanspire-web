import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import Uploader from 'components/common/Uploader';
import PersonalInfo from 'components/Lecturer/PersonalInfo';
import React from 'react';
import { useParams } from 'react-router';

const AddLecturer = () => {
  const { id } = useParams();

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
      {id ? (
        <h3 className="heading">Edited lecturer</h3>
      ) : (
        <h3 className="heading">Add new lecturer</h3>
      )}
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Space size={20} direction="vertical">
            {id ? <PersonalInfo typeSubmit="edit" /> : <PersonalInfo typeSubmit="create" />}
          </Space>
        </Col>
        <Col span={6}>
          <Card>
            <Uploader />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddLecturer;
