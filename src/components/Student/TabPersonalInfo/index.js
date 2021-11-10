import { Row, Col, Card, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.module.less';
import {
  classSvg,
  dateSvg,
  emailSvg,
  fullNameSvg,
  genderSvg,
  locationSvg,
  phoneSvg,
} from 'utils/iconsvg';
import Icon, { EditOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { studentState$ } from 'redux/selectors';
import { useState } from 'react';
import { getStudents } from 'redux/actions/students';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';

const DescriptionItem = ({ title, content, icon }) => (
  <div className={styles['description-item']}>
    <Icon className={styles.icon} component={icon} />
    <span className={styles.title}>{title}:</span>
    <span className={styles.content}>{content}</span>
  </div>
);

const PersonalInfo = props => {
  const dispatch = useDispatch();
  const students = useSelector(studentState$);
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [dob, setDOB] = useState();
  const { idStudent } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getStudents.getStudentsRequest());
  }, []);

  useEffect(() => {
    if (props.idStudent && students.data.length !== 0) {
      const student = students.data.find(element => element.idStudent === props.idStudent);
      setFullName(student.User.displayName);
      setGender(
        student.User.gender === 1 ? 'Male' : student.User.gender === 0 ? 'Female' : 'Others'
      );
      setPhoneNumber(student.User.phoneNumber);
      setDOB(moment(student.User.dob).format('DD/MM/YYYY'));
      setEmail(student.User.email);
      setAddress(
        `${student.User.address[0]}, ${student.User.address[1]}, ${student.User.address[2]}`
      );
    }
  }, [students.data]);

  return (
    <Card>
      <Row>
        <Col span={23}>
          <Col span={24}>
            <h4>Personal</h4>
            <Row>
              <DescriptionItem title="Full name" content={fullName} icon={fullNameSvg} />
            </Row>
            <Row>
              <DescriptionItem title="Gender" content={gender} icon={genderSvg} />
            </Row>
            <Row>
              <DescriptionItem title="Date of birth" content={dob} icon={dateSvg} />
            </Row>
          </Col>
          <Col span={24}>
            <h4>Contact</h4>
            <Row>
              <DescriptionItem title="Phone number" content={phoneNumber} icon={phoneSvg} />
            </Row>
            <Row>
              <DescriptionItem title="Email" content={email} icon={emailSvg} />
            </Row>
            <Row>
              <DescriptionItem title="Address" content={address} icon={locationSvg} />
            </Row>
          </Col>
        </Col>
        <Col span={1}>
          <Tooltip title="Edit">
            <EditOutlined
              className={styles['icon-edit']}
              onClick={() => history.push(`/student/edit/${idStudent}`)}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};

export default PersonalInfo;
