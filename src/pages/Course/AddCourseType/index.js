import { Button, Col, Form, Input, message, Row } from 'antd';
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

  useEffect(() => {
    if (idCourseType) {
      setIsEdit(true);
      const courseType = courseTypes.find(courseType => courseType.idCourseType === idCourseType);
      form.setFieldsValue({
        typeName: courseType.typeName,
        description: courseType.description,
      });
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
        message.success({
          content: isEdit ? 'Updated successfully' : 'Add course type successfully',
        });
        isEdit ? history.push('/coursetype/') : '';
      } else {
        message.error({
          content: 'Error',
        });
      }
      form.resetFields();
    }
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
                {isEdit ? 'Update' : 'Add'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddCourseType;
