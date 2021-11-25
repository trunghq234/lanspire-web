import { Col, notification, Row } from 'antd';
import studentApi from 'api/studentApi';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';

const StudentCard = React.forwardRef((props, ref) => {
  const [student, setStudent] = useState({});

  useEffect(async () => {
    try {
      const res = await studentApi.getById(props.idStudent);
      setStudent(res.data);
    } catch (e) {
      notification.error({
        message: { e },
      });
    }
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles['page-break']}>
        <h1 className={styles['center-name']}>LANSPIRE CENTER</h1>
        <h1 className={styles.title}>Thẻ học viên</h1>
        <Row className={styles.row}>
          <Col span={10}>Họ tên:</Col>
          <Col Span={10}>Nguyễn Văn A</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>Ngày sinh:</Col>
          <Col Span={10}>11/11/2021</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>Điện thoại:</Col>
          <Col Span={10}>1234456789</Col>
        </Row>
      </div>
      <div className={styles['page-break']}>
        <div className={styles['center-info']}>
          <h3>Thông tin về trung tâm</h3>
          <div>Địa chỉ: 66/17/15 HT45, phường Hiệp Thành, Quận 12, Thành phố Hồ Chí Minh </div>
          <div>Điện thoại: 12342342234</div>
          <div>Email: 13123132@gmail.com</div>
        </div>
      </div>
    </div>
  );
});

export default StudentCard;
