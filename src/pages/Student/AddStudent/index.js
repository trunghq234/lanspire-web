import React, { createRef, useEffect, useState } from 'react';
import { Button, Row, Col, Card, Form, Select, DatePicker, Input, notification } from 'antd';
import style from './index.module.less';
import { createStudents, getById, updateStudents } from 'redux/actions/students';
import { useDispatch, useSelector } from 'react-redux';
import ProvincePicker from 'components/common/ProvincePicker';
import { useHistory, useParams } from 'react-router-dom';
import { studentByIdState$, studentState$ } from 'redux/selectors';
import moment from 'moment';
import UserInfo from 'components/Student/UserInfo';

const AddStudent = () => {
  const [address, setAddress] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
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
    if (address.city && address.district) {
      const newUser = {
        displayName: fullName,
        gender: gender === 'female' ? 0 : gender === 'male' ? 1 : 2,
        phoneNumber,
        email,
        address: address.city,
        dob: dob.format('DD/MM/YYYY'),
      };
      if (!idStudent) {
        //Create
        dispatch(createStudents.createStudentsRequest(newUser));
      } else {
        //update
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
      setIsSubmit(true);
    }
  };
  useEffect(() => {
    if (isSubmit && students.isSuccess) {
      notification.success({
        message: idStudent ? 'Update successfully' : 'Create successfully',
        style: {
          width: 300,
        },
      });
      history.push('/student/list');
    } else if (isSubmit && !students.isSuccess && !students.error) {
      notification.error({
        title: 'Error',
        message: students.error,
        style: {
          width: 300,
        },
      });
    }
  }, [students.isLoading]);
  useEffect(() => {
    if (idStudent) {
      dispatch(getById.getByIdRequest(idStudent));
    }
  }, []);

  //Load data to UI when edit
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
    const userById = studentById.data.User;
    const fieldsValue = {
      fullName: userById.displayName,
      email: userById.email,
      phoneNumber: userById.phoneNumber,
      gender: userById.gender === 1 ? 'male' : userById.gender === 0 ? 'female' : 'others',
      dob: moment(userById.dob),
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
      className={style.form}
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
      <UserInfo />
    </Form>
  );
};
export default AddStudent;
