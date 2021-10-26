import React from 'react';
import { Card, Col, DatePicker, Form, Input, Row } from 'antd';

const CourseInfo = () => {
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
      <h3>Course Info</h3>
      <Form layout="vertical" validateMessages={validateMessages}>
        <Input.Group>
          <Row gutter={20}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Full name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Full name" maxLength="255" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <Form.Item label="StartingDate" name="startingDate" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <Form.Item label="EndingDate" name="endingDate" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={8} lg={8} xl={8}>
              <Form.Item label="Fee" name="fee" rules={[{ required: true, type: 'number' }]}>
                <Input placeholder="Fee" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    </Card>
  );
};

export default CourseInfo;
