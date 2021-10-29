import React, { useState } from 'react';
import { Button, Card, DatePicker, Form, Input, Select, Row, Col, InputNumber } from 'antd';
import ProvincePicker from 'components/common/ProvincePicker';
import styles from './index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { lectureState$ } from 'redux/selectors';
import * as lecturerActions from 'redux/actions/lecturers';
import moment from 'moment';
import { useParams } from 'react-router';

const { Option } = Select;

const idRoleLecturer = '386af797-fdf6-42dc-8bab-d5b42561b5fb';

const PersonalInfo = props => {
  const dispatch = useDispatch();
  const lecturers = useSelector(lectureState$);
  const [fAddress, setFAddress] = useState({});
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
  const editLecturer = lecturers.find(lecturer => lecturer.idLecturer === id);
  const dateFormat = 'DD/MM/YYYY';

  const handleSubmit = () => {
    const data = form.getFieldValue();

    // create lecturer
    if (typeSubmit === 'create') {
      const createdLecturer = {
        ...data,
        dob: moment(new Date()).format('DD/MM/YYYY').split('/').reverse().join('-'),
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        idRole: idRoleLecturer,
        imageUrl: 'test',
        username: null,
        password: null,
        isActivated: true,
      };
      dispatch(lecturerActions.createLecturer.createLecturerRequest(createdLecturer));
    }
    // edit lecturer
    else {
      const editedLecturer = {
        ...data,
        gender: data.gender == 'male' ? 0 : data.gender == 'female' ? 1 : 2,
        dob: moment(new Date()).format('DD/MM/YYYY').split('/').reverse().join('-'),
        idLecturer: id,
        idUser: editLecturer.idUser,
        username: editLecturer.username,
        password: editLecturer.password,
        isDeleted: editLecturer.isDeleted,
        isActivated: editLecturer.isActivated,
        imageUrl: editLecturer.imageUrl,
        idRole: idRoleLecturer,
      };
      console.log({ editedLecturer });
      dispatch(lecturerActions.updateLecturer.updateLecturerRequest(editedLecturer));
    }
  };

  React.useEffect(() => {
    if (id) {
      const editedLecturer = {
        displayName: editLecturer.displayName,
        gender:
          editLecturer.gender === 0 ? 'male' : editLecturer.gender === 1 ? 'female' : 'others',
        dob: moment(editLecturer.dob),
        phoneNumber: editLecturer.phoneNumber,
        address: editLecturer.address,
      };

      form.setFieldsValue(editedLecturer);
    }
  }, [id]);
  console.log({ lecturers });

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
