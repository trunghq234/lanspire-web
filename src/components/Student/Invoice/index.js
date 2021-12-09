import { Col, Row, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { currentDate } from 'utils/dateTime';
import { parseThousand } from 'utils/stringHelper';
import { parameterState$ } from 'redux/selectors';
import { getParameters } from 'redux/actions/parameters';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.less';
import logo from 'assets/images/logo.png';

const Invoice = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(parameterState$);
  const [param, setParam] = useState({});

  useEffect(() => {
    dispatch(getParameters.getParametersRequest());
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const centerName = data.find(e => e.name == 'centerName').value;
      const address = data.find(e => e.name == 'address').value;
      const district = data.find(e => e.name == 'district').value;
      const city = data.find(e => e.name == 'city').value;
      const phoneNumber = data.find(e => e.name == 'phoneNumber').value;
      setParam({
        centerName,
        address,
        district,
        city,
        phoneNumber,
      });
    }
  }, [data]);

  const { fullName, phoneNumber, address, totalFee, classes } = props;

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
    <div ref={ref} className={styles.print}>
      <Row gutter={[20, 20]}>
        <Col span={8} className={styles.center}>
          <img alt="logo" src={logo} width="80px" />
        </Col>
        <Col span={8} />
        <Col span={8} className={styles.student}>
          <h2>INVOICE</h2>
          <p>{currentDate().format('DD/MM/YYYY')}</p>
        </Col>
        <Col span={8} className={styles.center}>
          <p className={styles.title}>{param.centerName}</p>
          <p>{param.address}</p>
          <p>{`${param.district}, ${param.city}`}</p>
          <p>Phone: {param.phoneNumber}</p>
        </Col>
        <Col span={8} />
        <Col span={8} className={styles.student}>
          <h4>Invoice to</h4>
          <p>{fullName}</p>
          <p>{phoneNumber}</p>
          <p>{address}</p>
        </Col>
        <Col span={24}>
          <Table
            bordered
            loading={isLoading}
            columns={columns}
            rowKey={row => row.no}
            pagination={false}
            dataSource={classes}
          />
        </Col>
        <Col flex="auto" />
        <Col span={8} className={styles.total}>
          <p>{`Total: ${parseThousand(totalFee)} ₫`}</p>
        </Col>
      </Row>
    </div>
  );
});

export default Invoice;
