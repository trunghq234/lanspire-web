import {
  Col,
  Form,
  Input,
  Row,
  Skeleton,
  Select,
  Button,
  TimePicker,
  notification,
  Popconfirm,
} from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import LocationVN from '../../common/ProvincePicker/LocationVN.json';
import * as parameterActions from 'redux/actions/parameters';
import * as timeFrameActions from 'redux/actions/timeFrames';

import { parameterState$, timeFrameState$ } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import parameterApi from 'api/parameterApi';
import timeFrameApi from 'api/timeFrameApi';

const Parameter = props => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [offset, setOffset] = useState('5');
  const [loading, setLoading] = useState('false');
  const format = 'HH:mm';
  const { data: parameters } = useSelector(parameterState$);
  const { data: timeFrames } = useSelector(timeFrameState$);

  let cityOptions = [];
  const [districtInSelectedCity, setDistrictInSelectedCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
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
    console.log('Clicked cancel button');
    setVisible(false);
  };
  for (let city of Object.values(LocationVN)) {
    cityOptions.push(city);
  }

  const mapDistrictToArray = districts => {
    let result = [];
    for (let district of Object.values(districts)) {
      result.push({ name: district });
    }
    return result;
  };
  useEffect(() => {
    if (screen.width < 768) {
      setOffset('0');
    }
    dispatch(parameterActions.getParameters.getParametersRequest());
    dispatch(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest());
  }, []);
  useEffect(() => {
    for (let city of Object.values(LocationVN)) {
      if (city.name === selectedCity) {
        setDistrictInSelectedCity(mapDistrictToArray(city.districts));
        return true;
      }
    }
  }, [selectedCity]);
  useEffect(() => {
    if (parameters.length > 0) {
      console.log(parameters);
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
  const renderOptions = dataList => {
    if (dataList.length) {
      return dataList.map(data => {
        return (
          <Option key={data['name']} value={data['name']}>
            {data['name']}
          </Option>
        );
      });
    }
    return null;
  };
  const optionCityRendered = renderOptions(cityOptions);
  const optionDistrictRendered = renderOptions(districtInSelectedCity);
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
      console.log(minutes);
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
        timeFrameApi.updateAll(timeFrames);
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
      <h3>Change Parameter</h3>
      {/* <Skeleton loading={loading} active> */}
      <Form layout="vertical" form={form} style={{ marginTop: '1.5rem' }} onFinish={handleSubmit}>
        <Row>
          <Col className={styles['form-col']} xs={24} sm={24} md={14} offset={offset}>
            <Form.Item
              label="Max student of a course"
              name="maxStudent"
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              rules={[{ required: true }]}>
              <Input placeholder="Max student of a course" />
            </Form.Item>
          </Col>
          <Col className={styles['form-col']} xs={24} sm={24} md={14} offset={offset}>
            <Form.Item label="Min of a Time Frame" name="minTimeFrame" rules={[{ required: true }]}>
              <Input suffix="minutes" placeholder="Min of a Time Frame" />
            </Form.Item>
          </Col>
          <Col className={styles['form-col']} xs={24} sm={24} md={14} offset={offset}>
            <Form.Item label="Open time" name="openTime" rules={[{ required: true }]}>
              <TimePicker.RangePicker style={{ width: '100%' }} format={format} />
            </Form.Item>
          </Col>

          <Col className={styles['form-col']} xs={24} sm={24} md={12}></Col>
          <Col className={styles['form-col']} xs={24} sm={24} md={14} offset={offset}>
            <Button style={{ width: '100%' }} type="primary" onClick={showPopconfirm} size="large">
              Save Change
            </Button>
            <Popconfirm
              title="Invalid Timeframe will be inactive. Are you sure to save the changes"
              visible={visible}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}></Popconfirm>
          </Col>
        </Row>
      </Form>
      {/* </Skeleton> */}
    </div>
  );
};

export default Parameter;
