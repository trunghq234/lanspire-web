import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import ImageUploader from 'components/common/ImageUploader';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

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
          <Link to="/lecturer">Lecturer List</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {id ? <h3>Edited lecturer</h3> : <h3>Add new lecturer</h3>}

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={18}>
          <Space size={20} direction="vertical">
            {id ? <PersonalInfo typeSubmit="edit" /> : <PersonalInfo typeSubmit="create" />}
          </Space>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <ImageUploader />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddLecturer;
