import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, notification, Row } from 'antd';
import authApi from 'api/authApi';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { authState$ } from 'redux/selectors';
import logo from '../../../assets/images/logo.png';
import styles from './index.module.less';
const bcrypt = require('bcryptjs');

const hash = text => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

const ForgotPassword = props => {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(authState$);

  const login = values => {
    setLoading(true);
    let data = {
      userName: values.username,
    };
    notification['info']({
      message: 'Notification',
      description: `A verification be send to your email`,
    });
    authApi.resetEmail(values.username);
    history.push(`./reset-password/${values.username}`);
    // dispatch(getAuth.getAuthRequest(data));
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
                  <p>Enter your username!</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      id="login-form"
                      layout="vertical"
                      onFinish={login}
                      form={form}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input
                          placeholder="Username"
                          prefix={<UserOutlined style={{ color: '#3e79f7' }} />}></Input>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          block="true"
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

export default ForgotPassword;
