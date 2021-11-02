import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$, userState$ } from 'redux/selectors';
import ProvincePicker from '../ProvincePicker';
import { getUsers } from 'redux/actions/users';
import CreateAccountModal from '../CreateAccountModal/createAccountModal';

const { Option } = Select;
const idRoleEmployee = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const [address, setAddress] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [account, setAccount] = useState({ username: null, password: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const employees = useSelector(employeeState$);
  const users = useSelector(userState$);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { id } = useParams();
  const editEmployee = employees.data && employees.data.find(employ => employ.idEmployee === id);
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
  };

  const handleSubmit = () => {
    const data = form.getFieldValue();
    const { displayName, gender, dob, phoneNumber, email, address } = data;
    const { username, password } = account;

    // create employee
    if (displayName && gender && dob && phoneNumber && email && username && password && address) {
      if (typeSubmit === 'create') {
        const createdEmployee = {
          displayName,
          gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
          dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
          phoneNumber,
          email,
          address,
          idRole: idRoleEmployee,
          imageUrl: 'test',
          username,
          password,
          isActivated: true,
        };
        dispatch(employeeActions.createEmployee.createEmployeeRequest(createdEmployee));
        setIsSubmit(true);
      }
    }

    // edit employee
    if (typeSubmit === 'edit') {
      const editedEmployee = {
        ...data,
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
        idEmployee: id,
        idUser: editEmployee.idUser,
        username: editEmployee.username,
        password: editEmployee.password,
        isDeleted: editEmployee.isDeleted,
        isActivated: editEmployee.isActivated,
        imageUrl: editEmployee.imageUrl,
        idRole: idRoleEmployee,
      };
      dispatch(employeeActions.updateEmployee.updateEmployeeRequest(editedEmployee));
      setIsSubmit(true);
    }
  };

  const showModalCreateUser = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
  };
  const handleOk = () => {
    const data = modalForm.getFieldValue();

    // check username is exist
    const isUsernameExist = users.data.find(user => user.username === data.username);
    console.log({ isUsernameExist });
    if (!isEmpty(data)) {
      if (isEmpty(isUsernameExist)) {
        if (data.password === data.confirmPassword) {
          setAccount({ ...account, username: data.username, password: data.password });
          setIsModalVisible(false);
          modalForm.resetFields();
        }
      } else {
        message.error('Username is exist');
      }
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
        };
        form.setFieldsValue(editedEmployee);
        setAccount({
          ...account,
          username: employee.username,
          password: employee.password,
        });
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
      setAccount({ username: null, password: null });
    }
  }, [employees]);

  React.useEffect(() => {
    dispatch(employeeActions.getEmployees.getEmployeesRequest());
    dispatch(getUsers.getUsersRequest());
  }, [dispatch]);

  return (
    <Card>
      <h3>Personal information</h3>
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
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
              {editEmployee ? (
                <DatePicker format={dateFormat} />
              ) : (
                <DatePicker format={dateFormat} />
              )}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
              <Input placeholder="Phone number" maxLength="10" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Username" name="username" rules={[{ required: true }]}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input placeholder="Username" value={account.username} />
                {!id && (
                  <PlusCircleOutlined
                    style={{ marginLeft: '10px', fontSize: '1.2rem', cursor: 'pointer' }}
                    onClick={showModalCreateUser}
                  />
                )}
              </div>
            </Form.Item>
          </Col>
        </Row>
        <ProvincePicker address={address} callbackChanges={setAddress}></ProvincePicker>
        <Form.Item>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <CreateAccountModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalForm={modalForm}
        validateMessages={validateMessages}
      />
    </Card>
  );
};

export default PersonalInfo;
