import { Form, Card, Input, Row, Col, Select, DatePicker, Button } from 'antd';
import React, { useState } from 'react';
import ProvincePicker from '../ProvincePicker';
import styles from './index.module.less';

const { Option } = Select;

const PersonalInfo = () => {
  const [address, setAddress] = useState({});

  const dateFormat = 'DD/MM/YYYY';
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Personal information</h3>
        <div>
          <Button className={styles.btn} size="large" style={{ marginRight: '20px' }}>
            Discard
          </Button>
          <Button className={styles.btn} size="large" type="primary">
            Add employee
          </Button>
        </div>
      </div>
      <Form layout="vertical">
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

          <Col span={4}>
            <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <ProvincePicker address={address} callbackChanges={setAddress}></ProvincePicker>
      </Form>
    </Card>
  );
};

export default PersonalInfo;
