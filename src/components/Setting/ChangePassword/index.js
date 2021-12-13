import React from 'react';
import { Form, Col, Row, Button, Input, notification } from 'antd';
import { userState$ } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import userApi from 'api/userApi';
import store from 'redux/store';
import styles from './index.module.less';
const bcrypt = require('bcryptjs');

const hash = text => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};
const ChangePassword = () => {
  const history = useHistory();
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');

  const [form] = Form.useForm();
  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = form.getFieldsValue();
    if (newPassword != confirmPassword) {
      notification['error']({
        message: 'Error',
        description: `The confirm password must be the same as the new password `,
      });
      return;
    }
    if (currentPassword == newPassword) {
      notification['error']({
        message: 'Error',
        description: `The new password must be different from the current password `,
      });
      return;
    }
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      notification['error']({
        message: 'Error',
        description: `Password is incorrect`,
      });
      return;
    }
    userApi
      .updateUser({
        idUser: idUser,
        password: hash(newPassword),
      })
      .then(result => {
        notification['success']({
          message: 'Success',
          description: `Change password successfully. Please login again`,
        });
        store.dispatch({
          type: 'USER_LOGOUT',
        });
        localStorage.clear();
        history.push('./login');
      })
      .catch(err => {
        notification['error']({
          message: 'Error',
          description: err,
        });
      });
  };
  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Row>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="Current password"
                  name="currentPassword"
                  rules={[
                    { required: true, message: 'Please input your current password!' },
                    { min: 6, message: 'Password must be minimum 6 characters.' },
                  ]}>
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="New password"
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Please input new password!' },
                    { min: 6, message: 'Password must be minimum 6 characters.' },
                  ]}>
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Please input confirm password!' },
                    { min: 6, message: 'Password must be minimum 6 characters.' },
                  ]}>
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
              <Col className={styles['form-col']} xs={24} sm={24} md={14}>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit" size="large">
                  Change password
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChangePassword;
