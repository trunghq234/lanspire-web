import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, notification, Row, Statistic } from 'antd';
import authApi from 'api/authApi';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { authState$ } from 'redux/selectors';
import logo from '../../../assets/images/logo.png';
import styles from './index.module.less';
const bcrypt = require('bcryptjs');
const { Countdown } = Statistic;
const hash = text => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

const ConfirmReset = props => {
  let history = useHistory();
  const now = moment();

  const dispatch = useDispatch();
  const auth = useSelector(authState$);
  const { username } = useParams();
  const confirmReset = e => {
    e.preventDefault();
    form.validateFields().then(values => {
      if (values.newPassword != values.confirmPassword) {
        notification['error']({
          message: 'Error',
          description: `The Confirm Password must be the same as the New Password`,
        });
      }
      setLoading(true);
      authApi
        .updatePassword({
          code: values.code,
          password: hash(values.newPassword),
          username: username,
        })
        .then(res => {
          notification.info({
            message: 'Notification',
            description: res.data.message,
          });
          window.location = '/login';
        })
        .catch(err => {
          notification.error({
            message: 'Error',
            description: err.message,
          });
        });
    });
  };
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={20} md={12} lg={12}>
            <Card>
              <div style={{ margin: '1.5rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={logo} style={{ height: '5rem' }} />
                  <p>Reset Password</p>
                  <Countdown value={now + 60 * 1000} />
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      id="login-form"
                      layout="vertical"
                      // onFinish={confirmReset}
                      form={form}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Please input confirm code!' }]}>
                        <Input
                          placeholder="Code"
                          prefix={<UserOutlined style={{ color: '#3e79f7' }} />}></Input>
                      </Form.Item>
                      <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                          { required: true, message: 'Please input your new password!' },
                          { min: 6, message: 'Password must be minimum 6 characters.' },
                        ]}>
                        <Input.Password prefix={<LockTwoTone />}></Input.Password>
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                          { required: true, message: 'Please input your confirm password!' },
                          { min: 6, message: 'Password must be minimum 6 characters.' },
                        ]}>
                        <Input.Password prefix={<LockTwoTone />}></Input.Password>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          block="true"
                          onClick={confirmReset}
                          htmlType="submit"
                          loading={loading}>
                          Reset Password
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConfirmReset;
