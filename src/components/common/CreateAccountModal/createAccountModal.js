import { Modal, Form, Row, Col, Input } from 'antd';
import React from 'react';

const CreateAccountModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  modalForm,
  validateMessages,
}) => {
  return (
    <div>
      <Modal
        centered
        title="Create account"
        visible={isModalVisible}
        okText="Submit"
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={modalForm} layout="vertical" validateMessages={validateMessages}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                <Input placeholder="Username" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[{ required: true }]}>
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAccountModal;
