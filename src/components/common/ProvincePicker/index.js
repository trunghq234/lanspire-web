import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row } from 'antd';
import TypingSelect from '../TypingSelect';
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
          <TypingSelect
            value={selectedCity}
            options={cityOptions}
            optionName="name"
            optionKey="name"
            placeholder="Province"
            callbackSelection={val => {
              setSelectedCity(val);
              props.callbackChanges({
                ...props.address,
                city: val,
                district: undefined,
              });
            }}
          />
        </Col>
        <Col span={8}>
          <TypingSelect
            value={selectedDistrict}
            options={districtInSelectedCity}
            disabled={districtInSelectedCity.length === 0}
            optionName="name"
            optionKey="name"
            placeholder="Distrist"
            callbackSelection={val => {
              setSelectedDistrict(val);
              props.callbackChanges({
                ...props.address,
                district: val,
              });
            }}
          />
        </Col>
      </Row>
    </Form.Item>
  );
};

export default ProvincePicker;
