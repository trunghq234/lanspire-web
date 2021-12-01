import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button } from 'antd';
import styles from './index.module.less';
import { parseThousand } from 'utils/stringHelper';
import { currentDate } from 'utils/dateTime';

const Invoice = React.forwardRef((props, ref) => {
  const [centerName, setCenterName] = useState('Lanspire');
  const [centerAddress, setCenterAddress] = useState('Hồ chí minh');
  const [centerPhone, setCenterPhone] = useState('012345678');
  const { fullName, phoneNumber, address, totalFee, dataSource, creator } = props;
  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (record, value, index) => <span>{index + 1}</span>,
      align: 'center',
    },
    {
      title: 'Class name',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      align: 'center',
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
    },
  ];
  return (
    <div ref={ref} className={styles['invoice-root']}>
      <Row>
        <Col span={14}>Logo center</Col>
        <Col span={10} className={styles.header}>
          <h1 className={styles.title}>
            <strong>INVOICE</strong>
          </h1>
          <div className={styles['info-center']}>
            <strong>{centerName}</strong>
            <p className={styles['item-p']}>{centerPhone}</p>
            <p className={styles['item-p']}>{centerAddress}</p>
          </div>
        </Col>
      </Row>
      <Row className={styles['info-invoice']}>
        <Col span={10}>
          <h4 className={styles['item-h4']}>
            <strong>Invoice info:</strong>
          </h4>
          <p className={styles['item-p']}>{`Date: ${currentDate().format('DD/MM/YYYY')}`}</p>
          <p className={styles['item-p']}>{` By: ${creator}`}</p>
        </Col>
        <Col span={14}>
          <div className={styles['invoice-to']}>
            <h4 className={styles['item-h4']}>
              <strong>Invoice to:</strong>
            </h4>
            <p className={styles['item-p']}>{fullName}</p>
            <p className={styles['item-p']}>{phoneNumber}</p>
            <p className={styles['item-p']}>{address}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            bordered
            dataSource={dataSource}
            pagination={{ hideOnSinglePage: true }}
          />
        </Col>
      </Row>
      <Row justify="end" className={styles['total-row']}>
        <h1 className={styles['total-title']}>Total:</h1>
        <div lassName={styles['total-fee']}>
          <h1>
            {parseThousand(totalFee)}
            <span className={styles['total-unit']}>VND</span>
          </h1>
        </div>
      </Row>
    </div>
  );
});

export default Invoice;
