import React from 'react';
import { Card, Col, Form, Input, Row } from 'antd';
import { validateMessages } from 'constant/validationMessage';

const CourseInfo = () => {
  return (
    <Card>
      <h3>Course information</h3>
      <Form layout="vertical" validateMessages={validateMessages}>
        <Row gutter={20}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item label="Course name" name="courseName" rules={[{ required: true }]}>
              <Input placeholder="Course name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6} md={8} lg={8} xl={8}>
            <Form.Item label="Fee" name="fee" rules={[{ required: true, type: 'number' }]}>
              <Input placeholder="Fee" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CourseInfo;
