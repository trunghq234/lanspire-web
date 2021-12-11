import { Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParameters } from 'redux/actions/parameters';
import { parameterState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';
import styles from './index.module.less';

const Invoice = React.forwardRef((props, ref) => {
  const [centerName, setCenterName] = useState('Lanspire');
  const [centerAddress, setCenterAddress] = useState('Hồ chí minh');
  const [centerPhone, setCenterPhone] = useState('012345678');
  const { fullName, phoneNumber, address, totalFee, dataSource, creator } = props;
  const dispatch = useDispatch();
  const parameters = useSelector(parameterState$);
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

  useEffect(() => {
    dispatch(getParameters.getParametersRequest());
  }, []);

  useEffect(() => {
    if (parameters.data.length > 0) {
      setCenterName(parameters.data.find(parameter => parameter.name === 'centerName').value);
      const address =
        parameters.data.find(parameter => parameter.name === 'address').value +
        parameters.data.find(parameter => parameter.name === 'district').value +
        parameters.data.find(parameter => parameter.name === 'city').value;
      setCenterAddress(address);
      setCenterPhone(parameters.data.find(parameter => parameter.name === 'phoneNumber').value);
    }
  }, [parameters]);

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
