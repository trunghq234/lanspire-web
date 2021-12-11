import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Space, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import style from './index.module.less';
import { useSelector, useDispatch } from 'react-redux';
import { timeFrameState$, parameterState$ } from 'redux/selectors';
import { getParameters } from 'redux/actions/parameters';
import moment from 'moment';
import { compareTime } from 'utils/dateTime';

const FormAdd = props => {
  const timeFrames = useSelector(timeFrameState$);
  const parameters = useSelector(parameterState$);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const format = 'HH:mm';

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
                    { validator: TimeFrameValidator },
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
