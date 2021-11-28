import React from 'react';
import {
  Form,
  Col,
  Row,
  Space,
  Avatar,
  Button,
  Upload,
  Input,
  notification,
  DatePicker,
} from 'antd';
import { LockTwoTone } from '@ant-design/icons';
import { userState$ } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import userApi from '../../../api/userApi';
import store from 'redux/store';
import styles from './index.module.less';
const bcrypt = require('bcryptjs');

const hash = text => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};
const ChangePassword = props => {
  const history = useHistory();
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');

  const [form] = Form.useForm();
  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = form.getFieldsValue();
    if (newPassword != confirmPassword) {
      notification['error']({
        message: 'Error',
        description: `The Confirm Password must be the same as the New Password `,
      });
      return;
    }
    if (currentPassword == newPassword) {
      notification['error']({
        message: 'Error',
        description: `The New Password must be different from the Current Password `,
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
      <h3>Change Password</h3>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Row>
              <Col className={styles['form-col']} span={24}>
                <Form.Item
                  label="Current Password"
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
                  label="New Password"
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
                  label="Confirm Password"
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
