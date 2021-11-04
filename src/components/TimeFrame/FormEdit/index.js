import React, { useEffect } from 'react';
import { TimePicker, Form, Button } from 'antd';
import style from './index.module.less';
import { useSelector } from 'react-redux';
import { timeFrameState$ } from 'redux/selectors';
import moment from 'moment';

const FormEdit = props => {
  const format = 'HH:mm';
  const [form] = Form.useForm();
  const timeFrames = useSelector(timeFrameState$);
  const ExistValidator = (rule, value, callback) => {
    if (value) {
      const start = moment(value[0]).format('HH:mm');
      const end = moment(value[1]).format('HH:mm');
      const tmp = { startingTime: start, endingTime: end };
      const isExist = timeFrames.data.find(
        element =>
          element.startingTime.slice(0, element.startingTime.length - 3) === tmp.startingTime &&
          element.endingTime.slice(0, element.endingTime.length - 3) === tmp.endingTime &&
          element.idTimeFrame !== props.record.idTimeFrame
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
  useEffect(() => {
    form.setFieldsValue({
      timeFrame: [
        moment(`2/4/2000 ${props.record.startingTime}`),
        moment(`2/4/2000 ${props.record.endingTime}`),
      ],
    });
  }, [props.record]);
  return (
    <Form onFinish={props.onSave} autoComplete="off" form={form}>
      <Form.Item
        name="timeFrame"
        rules={[
          { required: true, message: 'Please, enter time frame.' },
          { validator: ExistValidator },
        ]}>
        <TimePicker.RangePicker format={format} className={style.timePicker} />
      </Form.Item>
      <Form.Item>
        <div className={style.action}>
          <Button type="primary" htmlType="submit" block className={style.btnSave}>
            Save
          </Button>
          <Button className={style.btnCancel} onClick={() => props.onCancel(false)}>
            Cancel
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default FormEdit;
