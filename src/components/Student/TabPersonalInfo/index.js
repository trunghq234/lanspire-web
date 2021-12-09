import Icon, { EditOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getStudents } from 'redux/actions/students';
import { studentState$ } from 'redux/selectors';
import { dateSvg, emailSvg, fullNameSvg, genderSvg, locationSvg, phoneSvg } from 'utils/iconsvg';
import StudentCard from '../StudentCard';
import styles from './index.module.less';

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
  const [studentCard, setStudentCard] = useState({
    fullName: '',
    dob: '',
    phoneNumber: '',
    centerName: '',
    centerAddress: '',
    centerEmail: '',
    centerPhone: '',
  });
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [dob, setDOB] = useState();
  const { idStudent } = useParams();
  const history = useHistory();
  const studentCardRef = useRef();
  const role = localStorage.getItem('role');

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
      setStudentCard({
        fullName: student.User.displayName,
        dob: moment(student.User.dob).format('DD/MM/YYYY'),
        phoneNumber: student.User.phoneNumber,
        centerName: '',
        centerAddress: '',
        centerEmail: '',
        centerPhone: '',
      });
    }
  }, [students.data]);

  const handlePrintStudentCard = useReactToPrint({
    content: () => studentCardRef.current,
  });

  return (
    <Card>
      <div style={{ display: 'none' }}>
        <StudentCard studentCard={studentCard} ref={studentCardRef} />
      </div>
      <Row>
        <Col span={22}>
          <h4>Personal</h4>
          <DescriptionItem title="Full name" content={fullName} icon={fullNameSvg} />
          <DescriptionItem title="Gender" content={gender} icon={genderSvg} />
          <DescriptionItem title="Date of birth" content={dob} icon={dateSvg} />
          <h4>Contact</h4>
          <DescriptionItem title="Phone number" content={phoneNumber} icon={phoneSvg} />
          <DescriptionItem title="Email" content={email} icon={emailSvg} />
          <DescriptionItem title="Address" content={address} icon={locationSvg} />
        </Col>
        <Col span={2}>
          <div className={role === 'admin' && 'flex'}>
            <Tooltip title="Print student card">
              <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrintStudentCard} />
            </Tooltip>
            {role === 'admin' && (
              <Tooltip title="Edit information">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => history.push(`/student/edit/${idStudent}`)}
                />
              </Tooltip>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default PersonalInfo;
