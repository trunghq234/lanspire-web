import { Col, Row, Space } from 'antd';
import PersonalInfo from 'components/common/PersonalInfo';
import Uploader from 'components/common/Uploader';
import React from 'react';
import { useParams } from 'react-router';

export default function AddEmployee() {
  const { id } = useParams();

  return (
    <div>
      {id ? <h3>Edited employee</h3> : <h3>Add new employee</h3>}
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Space>
            {id ? <PersonalInfo typeSubmit="edit" /> : <PersonalInfo typeSubmit="create" />}
          </Space>
        </Col>
        <Col span={6}>
          <Uploader />
        </Col>
      </Row>
    </div>
  );
}
