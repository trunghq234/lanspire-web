import React from 'react';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$ } from 'redux/selectors';
import { createCourseType } from 'redux/actions/courseTypes';
import { validateMessages } from 'constant/validationMessage';

const { TextArea } = Input;

const AddCourseType = props => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(courseTypeState$);

  const handleSubmit = () => {
    const { typeName, description } = form.getFieldValue();
    if (typeName && description) {
      dispatch(
        createCourseType.createCourseTypeRequest({
          typeName: typeName,
          description: description,
        })
      );
      isSuccess
        ? notification['success']({
            message: 'Successfully',
            description: 'This is the content of the notification.',
          })
        : notification['error']({
            message: 'Notification Title',
            description: 'This is the content of the notification.',
          });
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
            <Form.Item label="Description" name="description">
              <TextArea
                allowClear
                maxLength="255"
                placeholder="Description about the course type"
                autoSize={{ minRows: 3, maxRows: 6 }}
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
