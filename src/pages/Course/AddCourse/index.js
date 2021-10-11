import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import Uploader from 'components/common/Uploader';
import React from 'react';
import LevelInfo from '../LevelInfo';
import styles from './index.module.less';


const { Option } = Select;

const AddCourse= () => {
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
    <div>
        <div className={styles.header}>
          <div className={styles.header}>
            <h3 className={styles.title}>Add new course</h3>
              <Breadcrumb className={styles.breadcrumb}>
                  <Breadcrumb.Item>
                      <a href="../">Dashboard</a>
                      </Breadcrumb.Item>
                  <Breadcrumb.Item>
                  <a href="">Add Course</a>
                  </Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <div className={styles['col-6']} >
              <Button
                  className={styles['btn-add']}
                  type="primary"
                  size="large">
                  <PlusCircleOutlined />  
                  Add
              </Button>
              <Button
                  className={styles['btn-discard']}
                  type="primary"
                  size="large">
                    <MinusCircleOutlined />
                  Discard
              </Button>
          </div>
        </div>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={20} md={18} lg={18} xl={18}>
            <Space className={styles.space} size={20} direction="vertical">
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
                                    <DatePicker format={dateFormat} className={styles.maxwidth} />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                <Form.Item label="EndingDate" name="endingDate" rules={[{ required: true }]}>
                                    <DatePicker format={dateFormat} className={styles.maxwidth} />
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
                <LevelInfo/>
            </Space>
        </Col>
        <Col xs={24} sm={4} md={6} lg={6} xl={6}>
          <Card>
            <Uploader />
          </Card>
        </Col>
      </Row>
    </div>  
    
  );
}

export default AddCourse;