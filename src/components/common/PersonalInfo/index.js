import { Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import ProvincePicker from '../ProvincePicker';

const { Option } = Select;
const idRoleEmployee = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const [address, setAddress] = useState({});
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
          console.log({ createdEmployee });
          // dispatch(employeeActions.createEmployee.createEmployeeRequest(createdEmployee));
          setIsSubmit(true);
        } else {
          setIsSubmit(true);
          isSubmit === true ? message.error('Username is exist!') : '';
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
      setIsSubmit(true);
    }
  };

  const checkUsernameIsExist = username => {
    const result = users.data.find(user => user.username === username);
    // result === empty => checkUsernameIsExist: false
    return !isEmpty(result);
  };
  function isVietnamesePhoneNumber(number) {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  }

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
      }
    }
  }, [id, employees]);

  // Redirect to employee list
  React.useEffect(() => {
    if (employees.isSuccess && isSubmit) {
      id
        ? message.success('Update employee success!')
        : message.success('Create employee success!');

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
          <Col span={16}>
            <Form.Item label="Full name" name="displayName" rules={[{ required: true }]}>
              <Input placeholder="Full name" />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="others">Others</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>

          <Col span={4}>
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

          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
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
