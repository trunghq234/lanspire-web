import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import PersonalInfo from 'components/Employee/PersonalInfo/index';
import Uploader from 'components/common/Uploader';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

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
          <Link to="/employee">Employee List</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {id ? <h3>Edited employee</h3> : <h3>Add new employee</h3>}
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Space>
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
}
