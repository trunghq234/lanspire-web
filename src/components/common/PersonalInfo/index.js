import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$ } from 'redux/selectors';
import ProvincePicker from '../ProvincePicker';

const { Option } = Select;
const idRoleEmployee = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  const employees = useSelector(employeeState$);
  const [form] = Form.useForm();
  const { id } = useParams();
  const editEmployee = employees.find(employ => employ.idEmployee === id);
  const dateFormat = 'DD/MM/YYYY';
  const { typeSubmit } = props;

  const handleSubmit = () => {
    const data = form.getFieldValue();
    // create employee
    if (typeSubmit === 'create') {
      const createdEmployee = {
        ...data,
        dob: moment(new Date()).format('DD/MM/YYYY').split('/').reverse().join('-'),
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        idRole: idRoleEmployee,
        imageUrl: 'test',
        username: null,
        password: null,
        isActivated: true,
      };
      console.log({ createdEmployee });
      dispatch(employeeActions.createEmployee.createEmployeeRequest(createdEmployee));
    }
    // edit employee
    else {
      const editedEmployee = {
        ...data,
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        dob: moment(new Date()).format('DD/MM/YYYY').split('/').reverse().join('-'),
        idEmployee: id,
        idUser: editEmployee.idUser,
        username: editEmployee.username,
        password: editEmployee.password,
        isDeleted: editEmployee.isDeleted,
        isActivated: editEmployee.isActivated,
        imageUrl: editEmployee.imageUrl,
        idRole: idRoleEmployee,
      };
      console.log({ editedEmployee });
      dispatch(employeeActions.updateEmployee.updateEmployeeRequest(editedEmployee));
    }
  };

  console.log({ editEmployee });

  React.useEffect(() => {
    if (id) {
      const editedEmployee = {
        displayName: editEmployee.displayName,
        gender:
          editEmployee.gender === 0 ? 'male' : editEmployee.gender === 1 ? 'female' : 'others',
        dob: moment(editEmployee.dob),
        phoneNumber: editEmployee.phoneNumber,
        address: editEmployee.address,
      };

      form.setFieldsValue(editedEmployee);
    }
  }, [id]);

  console.log({ employees });

  return (
    <Card>
      <h3>Personal information</h3>
      <Form form={form} layout="vertical">
        <Row gutter={20}>
          <Col span={16}>
            <Form.Item label="Full name" name="displayName" rules={[{ required: true }]}>
              <Input />
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

          <Col span={8}>
            <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
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
    </Card>
  );
};

export default PersonalInfo;
