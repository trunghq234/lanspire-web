import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import ProvincePicker from 'components/common/ProvincePicker';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import * as lecturerActions from 'redux/actions/lecturers';
import { getUsers } from 'redux/actions/users';
import { lectureState$, userState$ } from 'redux/selectors';
import styles from './index.module.less';

const { Option } = Select;

const idRoleLecturer = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [fAddress, setFAddress] = useState({});
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
  const editLecturer = lecturers.data.find(lecturer => lecturer.idLecturer === id);
  const dateFormat = 'DD/MM/YYYY';

  const handleSubmit = () => {
    const data = form.getFieldValue();
    const { displayName, gender, dob, phoneNumber, email, address, username, password } = data;

    // if (moment().diff(dob.format('DD/MM/YYYY')) <= 18) {
    //   message.error('Date of birth must be over 18 years old!');
    // }
    console.log({ data });
    // create lecturer
    if (displayName && gender && dob && phoneNumber && email && username && password && address) {
      if (typeSubmit === 'create') {
        const createdLecturer = {
          displayName,
          gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
          dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
          phoneNumber,
          email,
          address,
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
    }

    // edit lecturer
    if (typeSubmit === 'edit') {
      const editedLecturer = {
        ...data,
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        dob: moment(data.dob).format('DD/MM/YYYY').split('/').reverse().join('-'),
        idLecturer: id,
        idUser: editLecturer.idUser,
        username: editLecturer.username,
        password: editLecturer.password,
        isDeleted: editLecturer.isDeleted,
        isActivated: editLecturer.isActivated,
        imageUrl: editLecturer.imageUrl,
        idRole: idRoleLecturer,
      };
      dispatch(lecturerActions.updateLecturer.updateLecturerRequest(editedLecturer));
      setIsSubmit(true);
    }
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
          address: lecturer.address,
          email: lecturer.email,
          // username: lecturer.username,
        };
        form.setFieldsValue(editedLecturer);
      }
    }
  }, [id, lecturers]);

  // Redirect to lecturer list
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
            <Col span={4}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select className={styles.maxwidth}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true }]}>
                <Input placeholder="Phone number" maxLength="10" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
        <ProvincePicker address={fAddress} callbackChanges={setFAddress} />

        <Input.Group>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                <Input placeholder="Username" maxLength="10" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input placeholder="Password" maxLength="10" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[{ required: true }]}>
                <Input placeholder="Confirm password" maxLength="10" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>

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
