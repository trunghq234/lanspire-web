import { Button, Col, Form, Input, InputNumber, message, Row } from 'antd';
import LanguageSelect from 'components/common/LanguageSelect';
import { validateMessages } from 'constant/validationMessage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { createLevel, getLevels, updateLevel } from 'redux/actions/levels';
import { levelState$ } from 'redux/selectors';

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

  const handleReset = () => {
    form.resetFields();
    if (isEdit) {
      history.push('/level/');
    }
  };

  const uniqueValidator = (rule, value, callback) => {
    try {
      const { levelName, point } = form.getFieldsValue();
      const res = levelList.find(level => level.levelName === levelName && level.point === point);
      if (res) {
        callback('');
        message.error('Level must be unique');
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };
  return (
    <>
      <h3>{isEdit ? 'Update level' : 'Add level'}</h3>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        validateMessages={validateMessages}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Form.Item
              label="Level name"
              name="levelName"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
              <Input placeholder="Level name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Point"
              name="point"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
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

export default AddLevel;
