import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, message } from 'antd';
import TypingSelect from 'components/common/TypingSelect';
import languages from 'constant/languages.json';
import styles from './index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$ } from 'redux/selectors';
import { createCourseType } from 'redux/actions/coursesType';

const AddCourseType = () => {
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
  const [fLanguage, setFLanguage] = useState();
  const languageList = [];
  for (let language of Object.values(languages)) {
    languageList.push(language);
  }
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(courseTypeState$);

  const handleSubmit = () => {
    const { typeName, language } = form.getFieldValue();
    if (typeName && language) {
      dispatch(
        createCourseType.createCourseTypeRequest({
          typeName: typeName,
          language: language,
        })
      );
      isSuccess ? message.success('Successfully add course type', 2) : message.error('Error', 2);
    }
    form.resetFields();
  };

  return (
    <>
      <h3>Add course type</h3>
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Form.Item label="Coure type name" name="typeName" rules={[{ required: true }]}>
              <Input placeholder="Coure type name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Language" name="language" rules={[{ required: true }]}>
              <TypingSelect
                value={fLanguage}
                options={languageList}
                disabled={languageList.length === 0}
                optionName="name"
                optionKey="name"
                placeholder="Language"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                htmlType="submit"
                onClick={handleSubmit}
                style={{ width: '100%' }}
                type="primary"
                size="large">
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddCourseType;

{
  /* <Col span={12}>
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
          }}
        />
      </Form.Item>
    </Col> */
}
