import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import * as employeeActions from 'redux/actions/employees';
import { getUsers } from 'redux/actions/users';
import { employeeState$, usersState$ } from 'redux/selectors';
import { converToUser } from 'utils';
import { checkUsernameIsExist, loadFieldsValue } from 'utils/loadFieldsValueForUser';
import ProvincePicker from '../../common/ProvincePicker';
import styles from './index.module.less';
import { dateValidator } from 'utils/validator';

const { Option } = Select;
const idRoleEmployee = '0a15d8a4-e1a1-4fc1-ba7a-157b34959289';

const PersonalInfo = props => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [city, setCity] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector(employeeState$);
  const users = useSelector(usersState$);
  const [form] = Form.useForm();
  const { id } = useParams();
  const dateFormat = 'DD/MM/YYYY';
  const { typeSubmit } = props;
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
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
    data.imageUrl = props.imgUrl;

    const currentDate = moment();
    if (currentDate < dob) {
      message.error('Date of birth is not greater than current date');
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
          if (!checkUsernameIsExist(users, username)) {
            // check confirm password
            if (confirmPassword !== password) {
              setIsSubmit(true);
              message.error('Confirm password does not match');
            } else {
              const createdEmployee = converToUser(data, idRoleEmployee);
              dispatch(employeeActions.createEmployee.createEmployeeRequest(createdEmployee));
              setCity(city);
              setIsSubmit(true);
            }
          } else {
            setIsSubmit(true);
            isSubmit === true ? message.error('Username is exist!') : '';
          }
        }
      }

      // edit employee
      if (typeSubmit === 'edit') {
        const employee = employees.data.find(employee => employee.idEmployee === id);

        const editedValue = {
          ...data,
          idUser: employee.idUser,
          username: employee.User.username,
          password: employee.User.password,
          imageUrl: props.imgUrl,
        };
        const editedEmployee = converToUser(editedValue, idRoleEmployee);
        dispatch(employeeActions.updateEmployee.updateEmployeeRequest(editedEmployee));
        setCity(city);
        setIsSubmit(true);
      }
    }
  };

  // Load information employee to form
  React.useEffect(() => {
    if (id && employees.data.length !== 0) {
      const employee = employees.data.find(employee => employee.idEmployee === id);
      loadFieldsValue(employee, setCity, form, props.setImgUrl);
    }
  }, [employees.data]);

  // Redirect to employee list
  React.useEffect(() => {
    if (employees.isSuccess && isSubmit) {
      if (id) {
        message.success('Update employee success!');
        history.push('/employee');
      } else {
        message.success('Create employee success!');
      }
      form.resetFields();
      props.setImgUrl(null);
    }
  }, [employees, history]);

  React.useEffect(() => {
    dispatch(employeeActions.getEmployees.getEmployeesRequest());
    dispatch(getUsers.getUsersRequest());
  }, [dispatch]);

  return (
    <Card>
      <h3>Personal information</h3>
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
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
                  validator: dateValidator,
                },
              ]}>
              <DatePicker format={dateFormat} className={styles.maxwidth} />
            </Form.Item>
          </Col>
          <Col xs={12} md={12} lg={12} xl={8}>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              onKeyPress={event => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              rules={[{ required: true }, { min: 10 }]}>
              <Input type="text" placeholder="Phone number" maxLength="10" />
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
                    // ({ getFieldValue }) => ({
                    //   validator(_, value) {
                    //     if (!value || getFieldValue('password') === value) {
                    //       return Promise.resolve();
                    //     }
                    //     return Promise.reject('Confirm password does not match!');
                    //   },
                    // }),
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
