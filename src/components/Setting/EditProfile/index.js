import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, updateUser } from 'redux/actions/users';
import { userState$ } from 'redux/selectors';
import {
  Form,
  Col,
  Row,
  Space,
  Avatar,
  Button,
  Upload,
  Input,
  Select,
  DatePicker,
  notification,
  Skeleton,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import LocationVN from '../../common/ProvincePicker/LocationVN.json';
import moment from 'moment';
import userApi from '../../../api/userApi';
const Option = { Select };
const EditProfile = () => {
  const dateFormat = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState('true');
  const [justify, setJustify] = useState('left');
  const dispatch = useDispatch();
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');
  useEffect(() => {
    if (screen.width <= 768) {
      setJustify('center');
    }
    dispatch(getUser.getUserRequest(idUser));
  }, []);
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
  useEffect(() => {
    if (user.idUser) {
      const record = {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender === 1 ? 'male' : user.gender === 0 ? 'female' : 'others',
        dob: moment(user.dob),
      };
      if (user.address) {
        record['address'] = user.address[0];
        record['district'] = user.address[1];
        record['city'] = user.address[2];
      }
      form.setFieldsValue(record);
      setLoading(false);
    }
  }, [user]);
  const handleSubmit = () => {
    const { phoneNumber, gender, dob, email, displayName, district, city, address } =
      form.getFieldsValue();
    if (moment(dob).isAfter(moment())) {
      notification['error']({
        message: 'Error',
        description: `Date of birth less than today`,
      });
      return;
    } else {
      const updatedUser = {
        idUser: idUser,
        displayName: displayName,
        gender: gender === 'female' ? 0 : gender === 'male' ? 1 : 2,
        phoneNumber: phoneNumber,
        email: email,
        dob: dob.format('MM/DD/YYYY'),
        address: [address, district, city],
      };
      userApi.updateUser(updatedUser).then(res => {
        dispatch(getUser.getUserRequest(idUser));
        notification['success']({
          message: 'Success',
          description: `Edit profile successfully`,
        });
      });
    }
  };

  return (
    <div>
      <Row justify={justify} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          style={{ marginBottom: '8px' }}
          size={{
            xs: 100,
            sm: 80,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={<UserOutlined />}
        />
        <div className={styles['handle-avatar']}>
          <Upload>
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button type="primary" ghost style={{ marginLeft: '0.5rem' }}>
            Remove
          </Button>
        </div>
      </Row>
      <Skeleton loading={loading} active>
        <Form layout="vertical" form={form} style={{ marginTop: '1.5rem' }} onFinish={handleSubmit}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item label="Full Name" name="displayName" rules={[{ required: true }]}>
                    <Input placeholder="Full name" />
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                    <Select placeholder="Gender" className={styles.maxwidth}>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Others</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item
                    onKeyPress={event => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    label="Phone number"
                    name="phoneNumber"
                    rules={[{ required: true }, { min: 10 }]}>
                    <Input type="text" placeholder="Phone number" maxLength="10" />
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item label="Date of Birth" name="dob" rules={[{ required: true }]}>
                    <DatePicker format={dateFormat} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                    <Input placeholder="Address" />
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
                  <Form.Item label="City" name="city" rules={[{ required: true }]}>
                    <Select
                      value={selectedCity}
                      placeholder="City"
                      onChange={val => {
                        setSelectedDistrict(null);
                        setSelectedCity(val);
                      }}>
                      {optionCityRendered}
                    </Select>
                  </Form.Item>
                </Col>
                <Col className={styles['form-col']} xs={24} sm={24} md={12}>
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
                <Col className={styles['form-col']} xs={24} sm={24} md={6}>
                  <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit" size="large">
                      Save Change
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </div>
  );
};

export default EditProfile;
