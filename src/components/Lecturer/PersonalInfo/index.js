import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import ProvincePicker from 'components/common/ProvincePicker';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as lecturerActions from 'redux/actions/lecturers';
import { getUsers } from 'redux/actions/users';
import { lectureState$, userState$ } from 'redux/selectors';
import styles from './index.module.less';

const { Option } = Select;

const idRoleLecturer = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const lecturers = useSelector(lectureState$);
  const users = useSelector(userState$);
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const [form] = Form.useForm();
  const { typeSubmit } = props;
  const { id } = useParams();
  const dateFormat = 'DD/MM/YYYY';

  const handleSubmit = () => {
    const data = form.getFieldValue();
    const {
      displayName,
      gender,
      dob,
      phoneNumber,
      email,
      detailsAddress,
      district,
      city,
      username,
      password,
      confirmPassword,
    } = data;

    // require all input not empty
    if (
      displayName &&
      gender &&
      dob &&
      phoneNumber &&
      email &&
      username &&
      password &&
      confirmPassword &&
      detailsAddress &&
      district &&
      city
    ) {
      if (typeSubmit === 'create') {
        if (!checkUsernameIsExist(username)) {
          if (confirmPassword !== password) {
            setIsSubmit(true);
            message.error('Confirm password does not match!');
          } else {
            const createdLecturer = {
              displayName,
              gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
              dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
              phoneNumber,
              email,
              address: [detailsAddress, district, city],
              idRole: idRoleLecturer,
              imageUrl: 'test',
              username,
              password,
              isActivated: true,
            };
            console.log({ createdLecturer });
            dispatch(lecturerActions.createLecturer.createLecturerRequest(createdLecturer));
            setIsSubmit(true);
          }
        } else {
          setIsSubmit(true);
          isSubmit === true ? message.error('Username is exist!') : '';
        }
      }
    }

    // edit lecturer
    if (typeSubmit === 'edit') {
      const lecturer = lecturers.data.find(lecturer => lecturer.idLecturer === id);

      const editedLecturer = {
        displayName,
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
        idLecturer: id,
        address: [detailsAddress, district, city],
        idUser: lecturer.idUser,
        username: lecturer.username,
        password: lecturer.password,
        isDeleted: lecturer.isDeleted,
        isActivated: lecturer.isActivated,
        imageUrl: lecturer.imageUrl,
        idRole: idRoleLecturer,
      };
      console.log({ editedLecturer });
      dispatch(lecturerActions.updateLecturer.updateLecturerRequest(editedLecturer));
      setIsSubmit(true);
    }
  };

  const checkUsernameIsExist = username => {
    const result = users.data.find(user => user.username === username);
    // result === empty => checkUsernameIsExist: false
    return !isEmpty(result);
  };

  // Load information lecturer to form
  React.useEffect(() => {
    if (id) {
      const lecturer =
        lecturers.data && lecturers.data.find(lecturer => lecturer.idLecturer === id);

      if (lecturer) {
        const editedLecturer = {
          displayName: lecturer.displayName,
          gender: lecturer.gender === 0 ? 'male' : lecturer.gender === 1 ? 'female' : 'others',
          dob: moment(lecturer.dob),
          phoneNumber: lecturer.phoneNumber,
          email: lecturer.email,
          username: lecturer.username,
          detailsAddress: lecturer.address[0],
          district: lecturer.address[1],
          city: lecturer.address[2],
        };
        form.setFieldsValue(editedLecturer);
      }
    }
  }, [id, lecturers]);

  // Notifies when create or update lecturer success
  React.useEffect(() => {
    if (lecturers.isSuccess && isSubmit) {
      id
        ? message.success('Update lecturer success!')
        : message.success('Create lecturer success!');

      form.resetFields();
    }
  }, [lecturers]);

  React.useEffect(() => {
    dispatch(lecturerActions.getLecturers.getLecturersRequest());
    dispatch(getUsers.getUsersRequest());
  }, [dispatch]);

  return (
    <Card>
      <h3>Personal information</h3>
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
        <Input.Group>
          <Row gutter={20}>
            <Col span={16}>
              <Form.Item label="Full name" name="displayName" rules={[{ required: true }]}>
                <Input placeholder="Full name" maxLength="255" />
              </Form.Item>
            </Col>
            <Col xs={8} xl={5}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Gender" className={styles.maxwidth}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={8} xl={5}>
              <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
            </Col>
            <Col span={4}>
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
            <Col xs={24} sm={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
        <ProvincePicker />

        {!id && (
          <Input.Group>
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }, { min: 6 }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  rules={[
                    { required: true },
                    { min: 6 },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Confirm password does not match!');
                      },
                    }),
                  ]}>
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        )}

        <Form.Item>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PersonalInfo;
