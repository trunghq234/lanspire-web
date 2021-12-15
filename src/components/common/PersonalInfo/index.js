import { Button, Card, Col, DatePicker, Form, Input, notification, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { employeeState$, usersState$ } from 'redux/selectors';
import ProvincePicker from '../ProvincePicker';
import * as employeeActions from 'redux/actions/employees';
import styles from './index.module.less';
import { getUsers } from 'redux/actions/users';
import moment from 'moment';
import { phoneNumberValidator } from 'utils/validator';

const { Option } = Select;
const idRoleEmployee = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const employees = useSelector(employeeState$);
  const users = useSelector(usersState$);
  const [form] = Form.useForm();
  const { id } = useParams();
  const dateFormat = 'DD/MM/YYYY';

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is a validate number!',
    },
    string: {
      len: "'${label}' must be exactly ${len} characters",
      min: "'${label}' must be at least ${min} characters",
      max: "'${label}' cannot be longer than ${max} characters",
      range: "'${label}' must be between ${min} and ${max} characters",
    },
  };

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

    const currentDate = moment();
    if (currentDate < dob) {
      notification.error({ message: 'Date of birth is not greater than current date' });
    } else {
      // create employee
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
            const createdEmployee = {
              displayName,
              gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
              dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
              phoneNumber,
              email,
              address: [detailsAddress, district, city],
              idRole: idRoleEmployee,
              imageUrl: 'test',
              username,
              password,
              isActivated: true,
            };
            dispatch(employeeActions.createEmployee.createEmployeeRequest(createdEmployee));
            setCity(city);
            setIsSubmit(true);
          } else {
            setIsSubmit(true);
            isSubmit === true ? notification.error({ message: 'Username is exist!' }) : '';
          }
        }
      }

      // edit employee
      if (typeSubmit === 'edit') {
        const employee = employees.data.find(employee => employee.idEmployee === id);

        const editedEmployee = {
          displayName,
          gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
          dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
          idEmployee: id,
          address: [detailsAddress, district, city],
          idUser: employee.idUser,
          username: employee.username,
          password: employee.password,
          isDeleted: employee.isDeleted,
          isActivated: employee.isActivated,
          imageUrl: employee.imageUrl,
          idRole: idRoleEmployee,
        };
        dispatch(employeeActions.updateEmployee.updateEmployeeRequest(editedEmployee));
        setCity(city);
        setIsSubmit(true);
      }
    }
  };

  const checkUsernameIsExist = username => {
    const result = users.data.find(user => user.username === username);
    // result === empty => checkUsernameIsExist: false
    return !isEmpty(result);
  };

  const dobValidator = (rule, value, callback) => {
    try {
      if (value > Date.now()) {
        callback('Date of birth is not greater than current date');
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };

  // Load information employee to form
  React.useEffect(() => {
    if (id) {
      const employee =
        employees.data && employees.data.find(employee => employee.idEmployee === id);

      if (employee) {
        const editedEmployee = {
          displayName: employee.displayName,
          gender: employee.gender === 0 ? 'male' : employee.gender === 1 ? 'female' : 'others',
          dob: moment(employee.dob),
          phoneNumber: employee.phoneNumber,
          address: employee.address,
          email: employee.email,
          detailsAddress: employee.address[0],
          district: employee.address[1],
          city: employee.address[2],
        };
        form.setFieldsValue(editedEmployee);
        setCity(employee.address[2]);
      }
    }
  }, [id, employees]);

  // Redirect to employee list
  React.useEffect(() => {
    if (employees.isSuccess && isSubmit) {
      id
        ? notification.success({ message: 'Update employee success!' })
        : notification.success({ message: 'Create employee success!' });

      form.resetFields();
    }
  }, [employees]);

  React.useEffect(() => {
    dispatch(employeeActions.getEmployees.getEmployeesRequest());
    dispatch(getUsers.getUsersRequest());
  }, [dispatch]);

  return (
    <Card>
      <Form layout="vertical" validateMessages={validateMessages}>
        <Row gutter={20}>
          <Col xs={24} md={24} xl={10} lg={12} xl={12}>
            <Form.Item label="Full name" name="displayName" rules={[{ required: true }]}>
              <Input placeholder="Full name" />
            </Form.Item>
          </Col>

          <Col xs={12} md={12} xl={4} lg={6} xl={6}>
            <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="others">Others</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={12} md={12} xl={10} lg={6} xl={6}>
            <Form.Item
              label="DOB"
              name="dob"
              rules={[
                { required: true },
                {
                  validator: dobValidator,
                },
              ]}>
              <DatePicker format={dateFormat} className={styles.maxwidth} />
            </Form.Item>
          </Col>

          <Col xs={12} md={12} lg={12} xl={8}>
            <Form.Item
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              label="Phone number"
              name="phoneNumber"
              rules={[{ required: true }, { validator: phoneNumberValidator }]}>
              <Input type="text" placeholder="Phone number" minLength={10} maxLength={10} />
            </Form.Item>
          </Col>

          <Col xs={12} md={12} lg={12} xl={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
        <ProvincePicker city={city} form={form} />

        {!id && (
          <Input.Group>
            <Row gutter={20}>
              <Col xs={24} lg={8}>
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }, { min: 6 }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
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
