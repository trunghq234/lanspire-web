import { Button, Col, Form, Input, notification, Row, Select } from 'antd';
import parameterApi from 'api/parameterApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { parameterState$ } from 'redux/selectors';
import LocationVN from '../../common/ProvincePicker/LocationVN.json';

const CenterInfo = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState('false');
  let cityOptions = [];
  const [districtInSelectedCity, setDistrictInSelectedCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const { data: parameters } = useSelector(parameterState$);

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
    for (let city of Object.values(LocationVN)) {
      if (city.name === selectedCity) {
        setDistrictInSelectedCity(mapDistrictToArray(city.districts));
        return true;
      }
    }
  }, [selectedCity]);
  useEffect(() => {
    if (parameters.length > 0) {
      const record = {
        centerName: parameters.find(parameter => parameter.name == 'centerName').value,
        address: parameters.find(parameter => parameter.name == 'address').value,
        email: parameters.find(parameter => parameter.name == 'email').value,
        phoneNumber: parameters.find(parameter => parameter.name == 'phoneNumber').value,
        city: parameters.find(parameter => parameter.name == 'city').value,
        district: parameters.find(parameter => parameter.name == 'district').value,
      };
      setSelectedCity(record.city);
      setSelectedDistrict(record.district);
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
  const handleSubmit = values => {
    const updatedParameter = [
      {
        name: 'address',
        value: values.address,
      },
      {
        name: 'centerName',
        value: values.centerName,
      },
      {
        name: 'district',
        value: values.district,
      },
      {
        name: 'city',
        value: values.city,
      },
      {
        name: 'email',
        value: values.email,
      },
      {
        name: 'phoneNumber',
        value: values.phoneNumber,
      },
    ];
    parameterApi
      .update(updatedParameter)
      .then(res => {
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
      <h3>Center infomation</h3>
      <Form layout="vertical" form={form} style={{ marginTop: '1.5rem' }} onFinish={handleSubmit}>
        <Row gutter={[20, 10]}>
          <Col span={16}>
            <Form.Item label="Center Name" name="centerName" rules={[{ required: true }]}>
              <Input placeholder="Center Name" />
            </Form.Item>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              rules={[{ required: true }, { min: 10 }]}>
              <Input placeholder="Phone number" />
            </Form.Item>
          </Col>
          <Col span={8} />
          <Col span={16}>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Form.Item label="City" name="city" rules={[{ required: true }]}>
              <Select
                value={selectedCity}
                placeholder="City"
                onChange={val => {
                  form.setFieldsValue({ ...form.getFieldsValue, district: '' });
                  // setSelectedDistrict(null);
                  setSelectedCity(val);
                }}>
                {optionCityRendered}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="District" name="district" rules={[{ required: true }]}>
              <Select
                value={selectedDistrict}
                placeholder="District"
                onChange={val => {
                  setSelectedDistrict(val);
                }}>
                {optionDistrictRendered}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} />
          <Col span={16}>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit" size="large">
              Save changes
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CenterInfo;
