import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Skeleton,
  Upload,
} from 'antd';
import ImageUploader from 'components/common/ImageUploader';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/actions/users';
import { userState$ } from 'redux/selectors';
import userApi from '../../../api/userApi';
import LocationVN from '../../common/ProvincePicker/LocationVN.json';
const { Option } = Select;

const EditProfile = () => {
  const dateFormat = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
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
      setImgUrl(user.imageUrl);
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
        imageUrl: imgUrl,
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
    <Skeleton loading={loading} active>
      <Row gutter={[40, 0]}>
        <Col span={16}>
          <Form
            layout="vertical"
            form={form}
            style={{ marginTop: '1.5rem' }}
            onFinish={handleSubmit}>
            <Row gutter={[20, 0]}>
              <Col span={24}>
                <Form.Item
                  label="Full name"
                  name="displayName"
                  rules={[{ required: true, max: 256 }]}>
                  <Input placeholder="Full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                  <Select placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Others</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of birth" name="dob" rules={[{ required: true }]}>
                  <DatePicker format={dateFormat} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input type="email" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={24}>
                <Form.Item>
                  <Button style={{ width: '100%' }} type="primary" htmlType="submit" size="large">
                    Save changes
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={8}>
          <h4>Avatar</h4>
          <ImageUploader url={imgUrl} onUploaded={setImgUrl} />
        </Col>
      </Row>
    </Skeleton>
  );
};

export default EditProfile;
