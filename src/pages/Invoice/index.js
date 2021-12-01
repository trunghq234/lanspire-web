import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Tooltip,
  Select,
  Breadcrumb,
  message,
  Modal,
  DatePicker,
} from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { billState$ } from 'redux/selectors';
import { deleteBill, getBills } from 'redux/actions/bills';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import Search from 'antd/lib/input/Search';

const { Option } = Select;
const { confirm } = Modal;

const Invoice = () => {
  const columns = [
    {
      title: 'Cashier',
      dataIndex: 'cashierName',
      width: '30%',
    },
    {
      title: 'Student',
      dataIndex: 'studentName',
      width: '30%',
    },
    {
      title: 'Created date',
      dataIndex: 'createdDate',
      align: 'center',
      width: '15%',
      sortDirections: ['descend'],
      sorter: (a, b) => moment(a.createdDate, 'DD-MM-YYYY') - moment(b.createdDate, 'DD-MM-YYYY'),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'center',
      sorter: (a, b) => a.fee - b.fee,
      render: text => <div>{parseInt(text).toLocaleString()}</div>,
    },
    {
      title: '',
      dataIndex: 'idBill',
      align: 'center',
      width: '10%',
      render: idBill => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="View details">
              <Link to={`/invoice/${idBill}`}>
                <Button type="primary" ghost icon={<EyeOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} onClick={() => deleteInvoice(idBill)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const [bills, setBills] = useState([]);
  const [billData, setBillData] = useState([]);
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading } = useSelector(billState$);
  const [picker, setPicker] = useState('year');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [dateFormat, setDateFormat] = useState('YYYY');
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState();

  const dateFormats = ['YYYY', 'YYYY', 'MM-YYYY', 'DD-MM-YYYY'];
  const pickers = ['all', 'year', 'month', 'date'];

  const handleChangeMode = value => {
    if (value == 0) {
      setIsDisabled(true);
      setPicker(pickers[value]);
    } else {
      const cur = moment();
      const tmp = moment(cur, dateFormats[value]);
      setSelectedDate(tmp);
      setDateFormat(dateFormats[value]);
      setPicker(pickers[value]);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    handleSearch(searchValue, picker, selectedDate);
  }, [searchValue, picker, selectedDate]);

  const handleChangeDate = (mode, date) => {
    switch (mode) {
      case 'year': {
        const cur = date.year();
        return billData.filter(bill => moment(bill.createdDate, 'DD-MM-YYYY').year() == cur);
      }
      case 'month': {
        const cur = date.month();
        return billData.filter(bill => moment(bill.createdDate, 'DD-MM-YYYY').month() == cur);
      }
      case 'date':
        return billData.filter(bill => moment(bill.createdDate, 'DD-MM-YYYY') == date);
      default:
        return billData;
    }
  };

  useEffect(() => {
    dispatch(getBills.getBillsRequest());
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      mappingData(data);
    }
  }, [data]);

  const mappingData = data => {
    const tmp = [];
    data.map(bill => {
      tmp.push({
        idBill: bill.idBill,
        cashierName: bill.User.displayName,
        studentName: bill.Student.User.displayName,
        createdDate: moment(bill.createdDate).format('DD-MM-YYYY'),
        total: bill.totalFee,
      });
    });
    setBillData(tmp);
    setBills(tmp);
  };

  const deleteInvoice = idBill => [
    confirm({
      title: 'Do you want to delete this bill?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      onOk() {
        dispatch(deleteBill.deleteBillRequest(idBill));

        isSuccess
          ? message.success({
              content: 'Deleted successfully',
            })
          : message.error({
              content: 'Error',
            });
      },
      onCancel() {},
    }),
  ];

  const handleSearch = (value, picker, selectedDate) => {
    const list = handleChangeDate(picker, selectedDate);
    if (value) {
      const tmp = list.filter(
        bill =>
          bill.cashierName.toLowerCase().search(value.toLowerCase()) >= 0 ||
          bill.studentName.toLowerCase().search(value.toLowerCase()) >= 0
      );
      setBills(tmp);
    } else {
      setBills(list);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Invoice</Breadcrumb.Item>
      </Breadcrumb>
      <h3>Invoice list</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search cashier/student name"
              allowClear
              enterButton
              onSearch={e => setSearchValue(e)}
            />
          </Col>
          <Col flex="auto" />
          <Col span={4}>
            <Select
              className="full"
              placeholder="Select mode"
              defaultValue="0"
              onSelect={value => handleChangeMode(value)}>
              <Option key="0">All</Option>
              <Option key="1">View in year</Option>
              <Option key="2">View in month</Option>
              <Option key="3">View in date</Option>
            </Select>
          </Col>
          <Col span={4}>
            <DatePicker
              disabled={isDisabled}
              value={selectedDate}
              picker={picker}
              format={dateFormat}
              onChange={value => setSelectedDate(value)}
            />
          </Col>
          <Col span={24}>
            <Table
              bordered
              columns={columns}
              loading={isLoading}
              dataSource={bills}
              rowKey={row => row.idBill}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '50', '100'],
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Invoice;
