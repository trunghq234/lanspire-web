import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Space, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import style from './index.module.less';
import { useSelector } from 'react-redux';
import { timeFrameState$ } from 'redux/selectors';
import moment from 'moment';

const FormAdd = props => {
  const timeFrames = useSelector(timeFrameState$);
  const [form] = Form.useForm();
  const { getFieldDecorator } = form;
  const format = 'HH:mm';
  const ExistValidator = (rule, value, callback) => {
    if (value) {
      const start = moment(value[0]).format('HH:mm');
      const end = moment(value[1]).format('HH:mm');
      const tmp = { startingTime: start, endingTime: end };
      const isExist = timeFrames.data.find(
        element =>
          element.startingTime.slice(0, element.startingTime.length - 3) === tmp.startingTime &&
          element.endingTime.slice(0, element.endingTime.length - 3) === tmp.endingTime
      );
      if (isExist) {
        callback('Time frame has already existed!');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  return (
    <Form name="form_add" onFinish={props.onSave} autoComplete="off" ref={props.formRef}>
      <Form.List name="timeFrames">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex' }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'time']}
                  fieldKey={[fieldKey, 'time']}
                  rules={[
                    { required: true, message: 'Please, enter time frame.' },
                    { validator: ExistValidator },
                  ]}>
                  <TimePicker.RangePicker format={format} />
                </Form.Item>
                <MinusCircleOutlined className={style['icon-minus']} onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                className={style.btnAdd}
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add time frame
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button className={style.btnSubmit} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormAdd;
