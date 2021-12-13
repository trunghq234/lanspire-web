import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { useSelector, useDispatch } from 'react-redux';
import { parameterState$ } from 'redux/selectors';
import { getParameters } from 'redux/actions/parameters';

const StudentCard = React.forwardRef((props, ref) => {
  const info = props.studentCard;
  const [centerName, setCenterName] = useState('Lanspire');
  const [centerAddress, setCenterAddress] = useState('Hồ chí minh');
  const [centerPhone, setCenterPhone] = useState('012345678');
  const [centerEmail, setCenterEmail] = useState('lanspire@gmail.com');
  const dispatch = useDispatch();
  const parameters = useSelector(parameterState$);

  useEffect(() => {
    dispatch(getParameters.getParametersRequest());
  }, []);

  useEffect(() => {
    if (parameters.data.length > 0) {
      setCenterName(parameters.data.find(parameter => parameter.name === 'centerName').value);
      const address =
        parameters.data.find(parameter => parameter.name === 'address').value +
        ', ' +
        parameters.data.find(parameter => parameter.name === 'district').value +
        ', ' +
        parameters.data.find(parameter => parameter.name === 'city').value;
      setCenterAddress(address);
      setCenterPhone(parameters.data.find(parameter => parameter.name === 'phoneNumber').value);
      setCenterEmail(parameters.data.find(parameter => parameter.name === 'email').value);
    }
  }, [parameters]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles['page-break']}>
        <h1 className={styles['center-name']}>{centerName.toUpperCase()}</h1>
        <h1 className={styles.title}>Thẻ học viên</h1>
        <Row className={styles.row}>
          <Col span={10}>Full name:</Col>
          <Col Span={10}>{info.fullName}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>Date of birth:</Col>
          <Col Span={10}>{info.dob}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>Phone number:</Col>
          <Col Span={10}>{info.phoneNumber}</Col>
        </Row>
      </div>
      <div className={styles['page-break']}>
        <div className={styles['center-info']}>
          <h3>Information about the center</h3>
          <div>Address: {centerAddress} </div>
          <div>Phone: {centerPhone}</div>
          <div>Email: {centerEmail}</div>
        </div>
      </div>
    </div>
  );
});

export default StudentCard;
