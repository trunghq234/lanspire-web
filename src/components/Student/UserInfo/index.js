import React from 'react';
import { Card, Col, Input, Row, Form, Select, DatePicker } from 'antd';
import ProvincePicker from '../ProvincePicker';

const UserInfo = () => {
  const dateFormat = 'DD/MM/yyyy';
  return (
    <Card>
      <Row gutter={20}>
        <Col span={16}>
          <Form.Item label="Full name" name="fullName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <ProvincePicker />
    </Card>
  );
};

export default UserInfo;
