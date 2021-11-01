import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Col, Form, Input, Row, message, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { levelState$ } from 'redux/selectors';
import { createLevel, getLevels, updateLevel } from 'redux/actions/levels';
import { validateMessages } from 'constant/validationMessage';
import LanguageSelect from 'components/common/LanguageSelect';

const AddLevel = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: levelList, isSuccess } = useSelector(levelState$);
  const history = useHistory();

  const { idLevel } = useParams();
  useEffect(() => {
    if (idLevel) {
      setIsEdit(true);
      dispatch(getLevels.getLevelsRequest());
      const res = levelList.find(level => level.idLevel === idLevel);
      form.setFieldsValue({
        levelName: res.levelName,
        point: res.point,
        language: res.language,
      });
    }
  }, [idLevel]);

  const handleSubmit = () => {
    const { levelName, point, language } = form.getFieldValue();
    // if (levelName && point && language) {
    if (isEdit) {
      dispatch(
        updateLevel.updateLevelRequest({
          idLevel: idLevel,
          levelName: levelName,
          point: point,
          language: language,
        })
      );
    } else {
      dispatch(
        createLevel.createLevelRequest({
          levelName: levelName,
          point: point,
          language: language,
        })
      );
    }
    if (isSuccess) {
      message.success({
        content: isEdit ? 'Updated successfully' : 'Add level successfully',
      });
      isEdit ? history.push('/level/') : '';
    } else {
      message.error({
        content: 'Error',
      });
    }
    form.resetFields();
  };

  return (
    <>
      <h3>Add level</h3>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        validateMessages={validateMessages}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Form.Item label="Level name" name="levelName" rules={[{ required: true }]}>
              <Input placeholder="Level name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Point" name="point" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} placeholder="Point" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Language" name="language" rules={[{ required: true }]}>
              <LanguageSelect />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                htmlType="submit"
                // onClick={handleSubmit}
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

export default AddLevel;
