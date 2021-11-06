import React, { createRef, useEffect, useState } from 'react';
import { Button, Row, Col, Form, notification } from 'antd';
import style from './index.module.less';
import { createStudents, getStudents, updateStudents } from 'redux/actions/students';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { studentState$ } from 'redux/selectors';
import moment from 'moment';
import UserInfo from 'components/Student/UserInfo';

const AddStudent = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [studentById, setStudentById] = useState({});
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const formRef = createRef();
  const students = useSelector(studentState$);
  const { idStudent } = useParams();
  const contentControl = {
    heading: idStudent ? 'Edit student info' : 'Add new student',
    btnSave: idStudent ? 'Update' : 'Add',
  };

  //notification
  useEffect(() => {
    if (isSubmit && students.isSuccess) {
      notification.success({
        message: idStudent ? 'Update successfully' : 'Create successfully',
        style: {
          width: 300,
        },
      });
      formRef.current.resetFields();
      if (idStudent) {
        history.push('/student/list');
      }
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

  //get students
  useEffect(() => {
    dispatch(getStudents.getStudentsRequest());
  }, []);

  //Load data to UI when edit
  useEffect(() => {
    if (idStudent && students.data.length !== 0) {
      const student = students.data.find(element => element.idStudent === idStudent);
      setStudentById(student);
      loadFieldsValue(student);
    }
  }, [students.data]);

  const loadFieldsValue = student => {
    const record = {
      fullName: student.User.displayName,
      email: student.User.email,
      phoneNumber: student.User.phoneNumber,
      gender: student.User.gender === 1 ? 'male' : student.User.gender === 0 ? 'female' : 'others',
      dob: moment(student.User.dob),
      detailsAddress: student.User.address[0],
      district: student.User.address[1],
      city: student.User.address[2],
    };
    setCity(student.User.address[2]);
    form.setFieldsValue(record);
  };

  //Submit
  const handleSubmit = () => {
    const { phoneNumber, gender, dob, email, fullName, district, city, detailsAddress } =
      form.getFieldsValue();
    const newUser = {
      displayName: fullName,
      gender: gender === 'female' ? 0 : gender === 'male' ? 1 : 2,
      phoneNumber,
      email,
      dob: dob.format('MM / DD / YYYY'),
      address: [detailsAddress, district, city],
    };
    if (!idStudent) {
      //Create
      dispatch(createStudents.createStudentsRequest(newUser));
    } else {
      //update
      const studentUpdate = {
        idStudent: studentById.idStudent,
        idUser: studentById.idUser,
        isDeleted: studentById.isDeleted,
        User: {
          idUser: studentById.idUser,
          ...newUser,
        },
      };
      dispatch(updateStudents.updateStudentsRequest(studentUpdate));
    }
    setIsSubmit(true);
  };

  //discard
  const onReset = () => {
    if (!idStudent) {
      formRef.current.resetFields();
    } else {
      loadFieldsValue(studentById);
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
          <Col span={3} offset={13}>
            <Button className={style['btn-discard']} size="large" onClick={onReset}>
              Discard
            </Button>
          </Col>
          <Col span={3}>
            <Button className={style['btn-add']} htmlType="submit" size="large">
              {contentControl.btnSave}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <UserInfo city={city} form={form} />
    </Form>
  );
};
export default AddStudent;
