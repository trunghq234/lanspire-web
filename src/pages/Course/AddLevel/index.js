import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, notification, InputNumber } from 'antd';
import TypingSelect from 'components/common/TypingSelect';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { levelState$ } from 'redux/selectors';
import { createLevel, getLevels } from 'redux/actions/levels';
import { validateMessages } from 'constant/validationMessage';
import languages from 'constant/languages.json';

const AddLevel = props => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: levelList, isSuccess } = useSelector(levelState$);
  const [fLanguage, setLanguage] = useState('');
  const [level, setLevel] = useState({});

  const { idLevel } = useParams();
  useEffect(() => {
    if (idLevel) {
      dispatch(getLevels.getLevelsRequest());
      const res = levelList.find(level => level.idLevel === idLevel);
      setLevel(res);
      form.setFieldsValue({
        levelName: res.levelName,
        point: res.point,
        language: res.language,
      });
      setLanguage(res.language);
    }
  }, [idLevel]);

  const handleSubmit = () => {
    const { levelName, point, language } = form.getFieldValue();
    if (levelName && point && language) {
      dispatch(
        createLevel.createLevelRequest({
          levelName: levelName,
          point: point,
          language: language,
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
      <h3>Add level</h3>
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
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
              <TypingSelect
                defaultValue={fLanguage}
                value={fLanguage}
                options={languages}
                disabled={languages.length === 0}
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

export default AddLevel;
