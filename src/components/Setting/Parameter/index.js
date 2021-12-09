import { Button, Col, Form, Input, notification, Popconfirm, Row, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import * as parameterActions from 'redux/actions/parameters';
import * as timeFrameActions from 'redux/actions/timeFrames';
import { parameterState$, timeFrameState$ } from 'redux/selectors';

const Parameter = props => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [offset, setOffset] = useState('5');
  const format = 'HH:mm';
  const { data: parameters } = useSelector(parameterState$);
  const { data: timeFrames } = useSelector(timeFrameState$);

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    handleSubmit();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (screen.width < 768) {
      setOffset('0');
    }
    dispatch(parameterActions.getParameters.getParametersRequest());
    dispatch(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest());
  }, []);

  useEffect(() => {
    if (parameters.length > 0) {
      const openTime = parameters.find(parameter => parameter.name == 'openTime').value;
      const closeTime = parameters.find(parameter => parameter.name == 'closeTime').value;

      const record = {
        maxStudent: parameters.find(parameter => parameter.name == 'maxStudent').value,
        minTimeFrame: parameters.find(parameter => parameter.name == 'minTimeFrame').value / 60,
        openTime: [moment(`11/20/2021 ${openTime}`), moment(`11/20/2021 ${closeTime}`)],
      };
      form.setFieldsValue(record);
    }
  }, [parameters]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const updatedParameter = [
      {
        name: 'maxStudent',
        value: values.maxStudent,
      },
      {
        name: 'minTimeFrame',
        value: values.minTimeFrame * 60,
      },
      {
        name: 'openTime',
        value: values.openTime[0].format('HH:mm:ss'),
      },
      {
        name: 'closeTime',
        value: values.openTime[1].format('HH:mm:ss'),
      },
    ];
    timeFrames.map(timeFrame => {
      const startTime = moment(`11/20/2021 ${timeFrame.startingTime}`);
      const endTime = moment(`11/20/2021 ${timeFrame.endingTime}`);
      const duration = moment.duration(endTime.diff(startTime));
      var minutes = duration.asMinutes();
      timeFrame.activate = true;
      if (values.minTimeFrame > minutes) {
        timeFrame.activate = false;
      }
      if (startTime.isBefore(values.openTime[0]) || endTime.isAfter(values.openTime[1])) {
        timeFrame.activate = false;
      }
    });
    parameterApi
      .update(updatedParameter)
      .then(res => {
        dispatch(timeFrameActions.updateTimeFrames.updateTimeFramesRequest(timeFrames));
        notification.success({
          message: 'Success',
          description: 'Update parameter successfully',
        });
      })
      .catch(err => {
        notification.error({
          message: 'Error',
          description: err.message,
        });
      });
  };

  return (
    <div>
      <h3>Regulations</h3>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        layout="horizontal"
        form={form}
        style={{ marginTop: '1.5rem' }}
        onFinish={handleSubmit}>
        <Row gutter={[20, 10]}>
          <Col span={14}>
            <Form.Item
              label="Max number of students"
              tooltip="Maximum number of students in a course"
              name="maxStudent"
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              rules={[{ required: true }]}>
              <Input placeholder="Max students of a course" />
            </Form.Item>
          </Col>
          <Col span={16} />
          <Col span={14}>
            <Form.Item label="Min of a time frame" name="minTimeFrame" rules={[{ required: true }]}>
              <Input suffix="minutes" placeholder="Min of a Time Frame" />
            </Form.Item>
          </Col>
          <Col span={16} />
          <Col span={14}>
            <Form.Item label="Business hours" name="openTime" rules={[{ required: true }]}>
              <TimePicker.RangePicker style={{ width: '100%' }} format={format} minuteStep={5} />
            </Form.Item>
          </Col>
          <Col span={16} />
          <Col span={14}>
            <Button style={{ width: '100%' }} type="primary" onClick={showPopconfirm} size="large">
              Save changes
            </Button>
            <Popconfirm
              title="Invalid Timeframe will be inactive. Are you sure to save the changes"
              visible={visible}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Parameter;
