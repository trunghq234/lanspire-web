import { Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import ProvincePicker from '../ProvincePicker';

const { Option } = Select;
const idRoleEmployee = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const [address, setAddress] = useState({});
  const dateFormat = 'DD/MM/YYYY';

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is a validate number!',
    },
  };
  return (
    <Card>
      <Form layout="vertical" validateMessages={validateMessages}>
        <Row gutter={20}>
          <Col span={16}>
            <Form.Item label="Full name" name="displayName" rules={[{ required: true }]}>
              <Input placeholder="Full name" />
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

          <Col span={4}>
            <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
              <Input placeholder="Phone number" maxLength="10" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <ProvincePicker
          address={address}
          callbackChanges={setAddress}
          rules={[{ required: true }]}></ProvincePicker>
      </Form>
    </Card>
  );
};

export default PersonalInfo;
