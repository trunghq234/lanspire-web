import React, { useEffect } from 'react';
import { TimePicker, Form, Button } from 'antd';
import style from './index.module.less';
import { useSelector, useDispatch } from 'react-redux';
import { getParameters } from 'redux/actions/parameters';
import { timeFrameState$, parameterState$ } from 'redux/selectors';
import moment from 'moment';
import { compareTime } from 'utils/dateTime';

const FormEdit = props => {
  const format = 'HH:mm';
  const [form] = Form.useForm();
  const timeFrames = useSelector(timeFrameState$);
  const parameters = useSelector(parameterState$);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParameters.getParametersRequest());
  }, []);

  const TimeFrameValidator = (rule, value, callback) => {
    if (value) {
      const start = moment(value[0]);
      const end = moment(value[1]);
      const openTime = parameters.data.find(element => element.name === 'openTime').value;
      const closeTime = parameters.data.find(element => element.name === 'closeTime').value;
      const minDuration = parameters.data.find(element => element.name === 'minTimeFrame').value;

      //convert to second
      const s =
        start.format('HH:mm').split(':')[0] * 3600 + start.format('HH:mm').split(':')[1] * 60;
      const e = end.format('HH:mm').split(':')[0] * 3600 + end.format('HH:mm').split(':')[1] * 60;

      const isExist = timeFrames.data.find(
        element =>
          element.startingTime.slice(0, element.startingTime.length - 3) ===
            start.format('HH:mm') &&
          element.endingTime.slice(0, element.endingTime.length - 3) === end.format('HH:mm')
      );
      if (
        !compareTime(start.format('HH:mm'), openTime) ||
        !compareTime(closeTime, end.format('HH:mm'))
      ) {
        callback(
          `The time frame must be between ${openTime.slice(
            0,
            openTime.length - 3
          )} - ${closeTime.slice(0, closeTime.length - 3)}`
        );
      } else if (e - s < minDuration) {
        callback(`Minimum duration is ${minDuration / 60} minutes!`);
      } else if (isExist) {
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
          { validator: TimeFrameValidator },
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
