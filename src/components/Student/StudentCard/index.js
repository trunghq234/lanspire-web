import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.module.less';

const StudentCard = React.forwardRef((props, ref) => {
  const info = props.studentCard;
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles['page-break']}>
        <h1 className={styles['center-name']}>LANSPIRE CENTER</h1>
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
          <div>Address: 66/17/15 HT45, phường Hiệp Thành, Quận 12, Thành phố Hồ Chí Minh </div>
          <div>Phone: 12342342234</div>
          <div>Email: 13123132@gmail.com</div>
        </div>
      </div>
    </div>
  );
});

export default StudentCard;
