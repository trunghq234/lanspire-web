import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Breadcrumb, Button, Card, Col, Divider, Row, Table } from 'antd';
import billApi from 'api/billApi';
import logo from 'assets/images/logo.png';
import styles from './index.module.less';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { parameterState$ } from 'redux/selectors';
import { getParameters } from 'redux/actions/parameters';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { PrinterOutlined } from '@ant-design/icons';
import { parseThousand } from 'utils/stringHelper';

const InvoiceDetails = () => {
  const { idBill } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(parameterState$);
  const [bill, setBill] = useState({});
  const [param, setParam] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    dispatch(getParameters.getParametersRequest());
  }, []);

  useEffect(() => {
    billApi
      .getById(idBill)
      .then(res => setBill(res.data))
      .catch(err => console.log(err));
  }, [idBill]);

  useEffect(() => {
    if (bill.Classes) {
      const tmp = [];
      bill?.Classes.map((e, index) => {
        tmp.push({
          no: index + 1,
          courseName: e?.Course?.courseName,
          className: e.className,
          startDate: e.startDate,
          endDate: e.endDate,
          room: e.room,
          fee: e?.BillInfo?.fee,
        });
      });
      setClasses(tmp);
    }
  }, [bill]);

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

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      align: 'center',
    },
    {
      title: 'Class name',
      dataIndex: 'className',
    },
    {
      title: 'Course name',
      dataIndex: 'courseName',
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      align: 'center',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      align: 'center',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      align: 'center',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      align: 'center',
      render: text => <div>{parseThousand(text)}</div>,
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/invoice">Invoice list</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Invoice details</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Invoice</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={8} className={styles.center}>
            <img alt="logo" src={logo} width="80px" />
          </Col>
          <Col span={8} />
          <Col span={8} className={styles.student}>
            <h2>INVOICE</h2>
            <p>{moment(bill.createdDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
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
            <p>{bill?.Student?.User?.displayName}</p>
            <p>{bill?.Student?.User?.phoneNumber}</p>
            <p>{bill?.Student?.User?.address.join(', ')}</p>
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
            <p>{`Total: ${parseThousand(bill?.totalFee)} ₫`}</p>
          </Col>
          <Divider />
          <Col flex="auto" />
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary" icon={<PrinterOutlined />} size="large">
              Print
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InvoiceDetails;
