import { Button, Col, Form, Input, notification, Row } from 'antd';
import { validateMessages } from 'constant/validationMessage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { createCourseType, updateCourseType } from 'redux/actions/courseTypes';
import { courseTypeState$ } from 'redux/selectors';

const { TextArea } = Input;

const AddCourseType = ({ trigger }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: courseTypes, isSuccess } = useSelector(courseTypeState$);
  const { idCourseType } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const [oldType, setOldType] = useState();

  useEffect(() => {
    if (idCourseType) {
      setIsEdit(true);
      const courseType = courseTypes.find(courseType => courseType.idCourseType === idCourseType);
      form.setFieldsValue({
        typeName: courseType.typeName,
        description: courseType.description,
      });
      setOldType(courseType.typeName);
    }
  }, [idCourseType, trigger]);

  const handleSubmit = () => {
    const { typeName, description } = form.getFieldValue();
    if (typeName) {
      if (isEdit) {
        dispatch(
          updateCourseType.updateCourseTypeRequest({
            idCourseType: idCourseType,
            typeName: typeName,
            description: description,
          })
        );
      } else {
        dispatch(
          createCourseType.createCourseTypeRequest({
            typeName: typeName,
            description: description,
          })
        );
      }
      if (isSuccess) {
        notification.success({
          message: isEdit ? 'Updated successfully' : 'Add course type successfully',
        });
        isEdit ? history.push('/coursetype') : '';
      } else {
        notification.error({
          message: 'Error',
        });
      }
      form.resetFields();
    }
  };

  const handleReset = () => {
    form.resetFields();
    if (isEdit) {
      history.push('/coursetype');
    }
  };

  const uniqueValidator = (rule, value, callback) => {
    try {
      const { typeName } = form.getFieldsValue();
      const res = courseTypes.find(type => type.typeName === typeName);
      if (res && typeName !== oldType) {
        callback('');
        notification.error({ message: 'Course type must be unique' });
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };
  return (
    <>
      <h3>{isEdit ? 'Update course type' : 'Add course type'}</h3>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        validateMessages={validateMessages}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Form.Item
              label="Coure type name"
              name="typeName"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
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
              <div className="flex">
                <Button htmlType="submit" block type="primary" size="large">
                  {isEdit ? 'Update' : 'Add'}
                </Button>
                <Button htmlType="reset" size="large" onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddCourseType;
