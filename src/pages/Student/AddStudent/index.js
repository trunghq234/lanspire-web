import React, { createRef, useEffect, useState } from 'react';
import { Button, Row, Col, Card, Form, Select, DatePicker, Input } from 'antd';
import style from './index.module.less';
import { createStudents, getById, updateStudents } from 'redux/actions/students';
import { useDispatch, useSelector } from 'react-redux';
import ProvincePicker from 'components/common/ProvincePicker';
import { useHistory, useParams } from 'react-router-dom';
import { studentByIdState$, studentState$ } from 'redux/selectors';
import moment from 'moment';
import studentApi from 'api/studentApi';

const AddStudent = () => {
  const [address, setAddress] = useState({});
  const dateFormat = 'DD/MM/YYYY';
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const formRef = createRef();
  const students = useSelector(studentState$);
  const studentById = useSelector(studentByIdState$);
  const { idStudent } = useParams();
  const contentControl = {
    heading: idStudent ? 'Edit student info' : 'Add new student',
    btnSave: idStudent ? 'Update' : 'Add',
  };
  const handleSubmit = () => {
    const { phoneNumber, gender, dob, email, fullName } = form.getFieldsValue();
    var gd = 1;
    switch (gender) {
      case 'male':
        gd = 1;
        break;
      case 'female':
        gd = 0;
        break;
      default:
        gd = 2;
    }
    if (address.city && address.district) {
      const newUser = {
        displayName: fullName,
        gender: gd,
        phoneNumber,
        email,
        address: address.city,
        dob: dob.format('DD/MM/YYYY'),
      };
      if (!idStudent) {
        dispatch(createStudents.createStudentsRequest(newUser));
      } else {
        const studentUpdate = {
          idStudent: studentById.data.idStudent,
          idUser: studentById.data.idUser,
          isDeleted: studentById.data.isDeleted,
          User: {
            idUser: studentById.data.idUser,
            ...newUser,
          },
        };
        dispatch(updateStudents.updateStudentsRequest(studentUpdate));
      }
    }
  };
  useEffect(() => {
    if (idStudent) {
      dispatch(getById.getByIdRequest(idStudent));
    }
  }, []);
  useEffect(() => {
    if (idStudent && studentById.data.length !== 0 && students.data.length === 0) {
      //Reload page
      loadFieldsValue();
    } else if (idStudent && students.data.length !== 0) {
      // List -> edit
      const student = students.data.find(element => element.idStudent === idStudent);
      const record = {
        fullName: student.User.displayName,
        email: student.User.email,
        phoneNumber: student.User.phoneNumber,
        gender:
          student.User.gender === 1 ? 'male' : student.User.gender === 0 ? 'female' : 'others',
        dob: moment(student.User.dob),
      };

      form.setFieldsValue(record);
    }
    // const addressValue = {
    //   detailsAddress: studentById.data.User.address,
    //   city: undefined,
    //   district: undefined,
    // };
    // setAddress(addressValue);
  }, [studentById]);
  const loadFieldsValue = () => {
    const fieldsValue = {
      fullName: studentById.data.User.displayName,
      email: studentById.data.User.email,
      phoneNumber: studentById.data.User.phoneNumber,
      gender:
        studentById.data.User.gender === 1
          ? 'male'
          : studentById.data.User.gender === 0
          ? 'female'
          : 'others',
      dob: moment(studentById.data.User.dob),
    };

    form.setFieldsValue(fieldsValue);
  };

  const onReset = () => {
    if (!idStudent) {
      formRef.current.resetFields();
    } else {
      loadFieldsValue();
    }
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is a validate number!',
    },
  };
  return (
    <Form
      layout="vertical"
      validateMessages={validateMessages}
      ref={formRef}
      form={form}
      onFinish={handleSubmit}>
      <Form.Item>
        <Row gutter={20} justify="end" className={style.actions}>
          <Col span={5}>
            <h1 className={style.heading}>{contentControl.heading}</h1>
          </Col>
          <Col span={2} offset={15}>
            <Button className={style['btn-discard']} size="large" onClick={onReset}>
              Discard
            </Button>
          </Col>
          <Col span={2}>
            <Button
              className={style['btn-add']}
              htmlType="submit"
              size="large"
              loading={students.isLoading}>
              {contentControl.btnSave}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Card>
        <Row gutter={20}>
          <Col span={16}>
            <Form.Item label="Full name" name="fullName" rules={[{ required: true }]}>
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
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <ProvincePicker address={address} callbackChanges={setAddress}></ProvincePicker>
      </Card>
    </Form>
  );
};
export default AddStudent;
