import { Row, Col, Space } from 'antd';
import ImageUploader from 'components/common/ImageUploader';
import PersonalInfo from 'components/common/PersonalInfo';
import React from 'react';

export default function AddEmployee() {
  return (
    <div>
      <h3>Add new employee</h3>
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Space>{/* <PersonalInfo /> */}</Space>
        </Col>
        <Col span={6}>
          <ImageUploader />
        </Col>
      </Row>
    </div>
  );
}
