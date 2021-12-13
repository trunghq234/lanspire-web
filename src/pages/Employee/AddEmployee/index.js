import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import ImageUploader from 'components/common/ImageUploader';
import PersonalInfo from 'components/Employee/PersonalInfo/index';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function AddEmployee() {
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState('');

  return (
    <div>
      <Breadcrumb style={{ marginBottom: '20px' }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/employee">Employee List</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      {id ? <h3>Edit employee</h3> : <h3>Add new employee</h3>}
      <Row gutter={[20, 20]}>
        <Col span={18}>
          {id ? (
            <PersonalInfo imgUrl={imgUrl} setImgUrl={setImgUrl} typeSubmit="edit" />
          ) : (
            <PersonalInfo imgUrl={imgUrl} setImgUrl={setImgUrl} typeSubmit="create" />
          )}
        </Col>
        <Col span={6}>
          <Card>
            <h4>Avatar</h4>
            <ImageUploader onUploaded={setImgUrl} url={imgUrl} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
