import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import MultipleSelect from 'components/common/MultipleSelect';
import TypingSelect from 'components/common/TypingSelect';
import React, { useState } from 'react';
import styles from './index.module.less';


const { Option } = Select;

const AddTypeOfCourse= () => {
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
  const [languageInfo, setLanguageInfo] = useState();
  const [tags, setTags] = useState();
  const languageList = [
    { type: 'English', lang: 'EN', image: {avatar:true, src:"https://cdn-icons-png.flaticon.com/512/197/197374.png" }},
    { type: 'Spanish', lang: 'EN' },
    { type: 'Japanese', lang: 'EN' },
  ];
  const tagList = [
    { type: 'Reading', lang: 'EN' },
    { type: 'Speaking', lang: 'EN' },
    { type: 'Writing', lang: 'EN' },
    { type: 'Listening', lang: 'EN' },
  ];
  return (
    <div>
        <div className={styles.header}>
          <div className={styles.header}>
            <h3 className={styles.title}>Add new type of course</h3>
              <Breadcrumb className={styles.breadcrumb}>
                  <Breadcrumb.Item>
                      <a href="../">Dashboard</a>
                      </Breadcrumb.Item>
                  <Breadcrumb.Item>
                  <a href="">Add Type Of Course</a>
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
        <Col span={24}>
            <Space className={styles.space} size={20} direction="vertical">
                <Card>
                    <h3>Basic Info</h3>
                    <Form layout="vertical" validateMessages={validateMessages}>
                        <Input.Group>
                          <Row gutter={20}>
                              <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                <Form.Item label="Full name" name="name" rules={[{ required: true }]}>
                                    <Input placeholder="Full name" maxLength="255" />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                <Form.Item label="Language" name="language" rules={[{ required: true }]}>
                                  <TypingSelect
                                    value={languageInfo}
                                    options={languageList}
                                    disabled={languageList.length === 0}
                                    optionName="type"
                                    optionKey="type"
                                    placeholder="Language"
                                    callbackSelection={val => {
                                        setLanguageInfo(val);
                                    }}
                                    />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item label="Tags" name="tag" rules={[{ required: true }]}>
                                  <MultipleSelect
                                    value={tags}
                                    options={tagList}
                                    disabled={tagList.length === 0}
                                    optionName="type"
                                    optionKey="type"
                                    placeholder="Tags"
                                    callbackSelection={val => {
                                        setTags(val);
                                  }}>
                                  </MultipleSelect>
                                </Form.Item>
                              </Col>
                          </Row>
                        </Input.Group>
                    </Form>
                </Card>
            </Space>
        </Col>
      </Row>
    </div>  
    
  );
}

export default AddTypeOfCourse;