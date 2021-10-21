import React, { useState } from 'react';
import { Card, DatePicker, Form, Input, Select, Row, Col, InputNumber } from 'antd';
import ProvincePicker from 'components/common/ProvincePicker';
import styles from './index.module.less';

const { Option } = Select;

const PersonalInfo = () => {
  const [fAddress, setFAddress] = useState({});
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const dateFormat = 'DD/MM/YYYY';
  return (
    <Card>
      <h3>Personal information</h3>
      <Form layout="vertical" validateMessages={validateMessages}>
        <Input.Group>
          <Row gutter={20}>
            <Col span={16} xl={14}>
              <Form.Item label="Full name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Full name" maxLength="255" />
              </Form.Item>
            </Col>
            <Col xs={8} xl={5}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Gender" className={styles.maxwidth}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={8} xl={5}>
              <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
            </Col>
            <Col xs={12} sm={8} xl={8}>
              <Form.Item label="Phone number" name="phonenumber" rules={[{ required: true }]}>
                <Input placeholder="Phone number" maxLength="10" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
        <ProvincePicker address={fAddress} callbackChanges={setFAddress} />
      </Form>
    </Card>
  );
};

export default PersonalInfo;
