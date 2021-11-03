import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import LocationVN from './LocationVN.json';

const ProvincePicker = props => {
  let cityOptions = [];
  const [districtInSelectedCity, setDistrictInSelectedCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

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

  const renderOptions = dataList => {
    if (dataList.length) {
      return dataList.map(data => {
        return (
          <Option key={data['city']} value={data['city']}>
            {data['name']}
          </Option>
        );
      });
    }
    return null;
  };
  const optionCityRendered = renderOptions(cityOptions);
  const optionDistrictRendered = renderOptions(districtInSelectedCity);
  return (
    <Form.Item label="Address" name="address" rules={[{ required: true }]}>
      <Row gutter={20}>
        <Col span={8}>
          <Input
            placeholder="Address"
            style={{ width: '100%' }}
            onChange={val =>
              props.callbackChanges({
                ...props.address,
                detailsAddress: val.target.value,
              })
            }
          />
        </Col>
        <Col span={8}>
          <Select
            value={selectedCity}
            placeholder="Tỉnh/Thành phố"
            onChange={val =>
              props.callbackChanges({
                ...props.address,
                city: val,
              })
            }>
            {optionCityRendered}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            value={selectedDistrict}
            placeholder="Huyện/Quận"
            onChange={val =>
              props.callbackChanges({
                ...props.address,
                district: val,
              })
            }>
            {optionDistrictRendered}
          </Select>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default ProvincePicker;
