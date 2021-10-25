import Icon, { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Divider, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser } from 'redux/actions/users';
import { userState$ } from 'redux/selectors';
import background_image from '../../assets/images/login_background.jpg';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/svg/facebook.svg';
import google from '../../assets/svg/google.svg';
import styles from './index.module.less';
const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const login = values => {
    setLoading(true);
    let data = {
      username: values.username,
      password: values.password,
    };
    dispatch(getUser.getUserRequest(data));
    const user = useSelector(userState$);
    if (user.accessToken) {
      setLoading(false);
      history.replace('/admin');
    } else {
      setFailedMessage(user.message);
    }
  };

  let noticeFailed = () => {
    setFailedMessage('Input not be filled');
    handleFailed();
  };
  const handleFailed = () => {
    setIsFailed('1');
    setTimeout(function () {
      setIsFailed('0');
    }, 5000);
  };
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState('0');
  const [failedMessage, setFailedMessage] = useState('');
  const [form] = Form.useForm();
  return (
    <div
      style={{
        backgroundImage: `url(${background_image})`,
        height: '100vh',
        backgroundSize: 'cover',
      }}>
      <div
        className={styles.container}
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
          height: '100%',
          flexDirection: 'column',
        }}>
        <Row justify="center">
          <Col xs={20} sm={20} md={12} lg={12}>
            <Card>
              <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={logo} style={{ height: '5rem' }} />
                  <p>Welcom to Lanspire!</p>
                </div>
                <Row className="ant-row-center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <div className={styles.alert} style={{ opacity: `${isFailed}` }}>
                      <Alert message={failedMessage} type="error" showIcon />
                    </div>
                    <Form
                      id="login-form"
                      layout="vertical"
                      form={form}
                      onFinish={login}
                      onFinishFailed={noticeFailed}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                        <Input
                          placeholder="Username"
                          prefix={<UserOutlined style={{ color: '#3e79f7' }} />}></Input>
                      </Form.Item>
                      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                        <Input.Password
                          placeholder="Password"
                          prefix={<LockTwoTone />}></Input.Password>
                      </Form.Item>
                      {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item> */}
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          block="true"
                          htmlType="submit"
                          loading={loading}>
                          Sign In
                        </Button>
                      </Form.Item>
                    </Form>
                    <div>
                      <Divider
                        style={{
                          fontSize: '14px',
                          fontWeight: '400',
                          color: 'rgba(114,132,154,.7)',
                        }}
                        plain>
                        or connect with
                      </Divider>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ marginRight: '0.5rem' }}>
                          <Icon
                            component={() => (
                              <img
                                src={google}
                                style={{ display: 'inline-block', height: '1rem', float: 'left' }}
                              />
                            )}
                          />
                          Google
                        </Button>
                        <Button>
                          <Icon
                            component={() => (
                              <img
                                src={facebook}
                                style={{ display: 'inline-block', height: '1rem', float: 'left' }}
                              />
                            )}
                          />
                          Facebook
                        </Button>
                      </div>
                    </div>
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

export default Login;
