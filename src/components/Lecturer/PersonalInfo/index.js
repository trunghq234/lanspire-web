import React, { useState } from 'react';
import { message, Button, Card, DatePicker, Form, Input, Select, Row, Col, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProvincePicker from 'components/common/ProvincePicker';
import styles from './index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { lectureState$, userState$ } from 'redux/selectors';
import * as lecturerActions from 'redux/actions/lecturers';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { useParams, useHistory } from 'react-router';
import { getUsers } from 'redux/actions/users';
import CreateAccountModal from 'components/common/CreateAccountModal/createAccountModal';

const { Option } = Select;

const idRoleLecturer = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [fAddress, setFAddress] = useState({});
  const [account, setAccount] = useState({ username: null, password: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const [modalForm] = Form.useForm();
  const { typeSubmit } = props;
  const { id } = useParams();
  const editLecturer = lecturers.data.find(lecturer => lecturer.idLecturer === id);
  const dateFormat = 'DD/MM/YYYY';

  const handleSubmit = () => {
    const data = form.getFieldValue();
    const { displayName, gender, dob, phoneNumber, email, address } = data;
    const { username, password } = account;

    // if (moment().diff(dob.format('DD/MM/YYYY')) <= 18) {
    //   message.error('Date of birth must be over 18 years old!');
    // }

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
        setAccount({
          ...account,
          username: lecturer.username,
          password: lecturer.password,
        });
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
      setAccount({ username: null, password: null });
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
        </Input.Group>
        <ProvincePicker address={fAddress} callbackChanges={setFAddress} />
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
