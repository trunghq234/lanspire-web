import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { deleteStudents, getStudents } from 'redux/actions/students';
import { studentState$ } from 'redux/selectors/index';
import { currentDate } from 'utils/dateTime';
import { formatName } from 'utils/stringHelper';
import ExportCSV from 'components/common/ExportCSV';
import { studentHeadersExcel } from 'constant/headersExcel';

const { Search } = Input;

const Student = () => {
  const columns = [
    {
      title: 'No.',
      key: 'index',
      width: '80px',
      render: (record, value, index) => <span>{(currentPage - 1) * pageSize + index + 1}</span>,
      align: 'center',
      responsive: ['md'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['lg'],
      ellipsis: true,
    },
    {
      width: '15%',
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      ellipsis: 'true',
      responsive: ['md'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      ellipsis: true,
      responsive: ['xl'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'No study',
          value: 0,
        },
        {
          text: 'Studying',
          value: 1,
        },
        {
          text: 'Registered',
          value: 2,
        },
      ],
      defaultFilteredValue: [true],
      render: (status, index) => {
        const color = status === 0 ? 'gray' : status === 1 ? 'blue' : 'orange';
        return (
          <Tag color={color} key={index}>
            {status === 0 ? 'No study' : status === 1 ? 'Studying' : 'Registered'}
          </Tag>
        );
      },
      responsive: ['sm'],
      onFilter: (value, record) => record.status === value,
    },
    {
      key: 'actions',
      dataIndex: 'idStudent',
      align: 'center',
      render: idStudent => {
        return (
          <div className={role !== 'employee' && 'flex'}>
            <Tooltip title="View details">
              <Link to={`/student/details/${idStudent}`}>
                <Button icon={<EyeOutlined />} />
              </Link>
            </Tooltip>
            {role !== 'employee' && (
              <Tooltip title="Edit information">
                <Link to={`/student/edit/${idStudent}`}>
                  <Button type="primary" ghost icon={<EditOutlined />} />
                </Link>
              </Tooltip>
            )}
            {role !== 'employee' && (
              <Tooltip title="Delete">
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(idStudent)} />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const students = useSelector(studentState$);
  const [data, setData] = useState([]); //Data ban đầu
  const [dataSearch, setDataSearch] = useState([]); //Data sau khi search
  const [isDeleted, setIsDeleted] = useState(false);
  const [idStudent, setIdStudent] = useState();
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [role, setRole] = useState();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
    dispatch(getStudents.getStudentsRequest());
  }, []);

  //Custom data
  useEffect(() => {
    const tmpData = students.data.map((student, index) => {
      const address = `${student.User.address[0]}, ${student.User.address[1]}, ${student.User.address[2]}`;
      var status = 0;
      for (let i = 0; i < student.Classes.length; ++i) {
        const item = student.Classes[i];
        if (moment(item.startDate) <= currentDate() && moment(item.endDate) >= currentDate()) {
          status = 1;
          break;
        }
        if (moment(item.startDate) > currentDate()) {
          status = 2;
        }
      }

      return {
        idStudent: student.idStudent,
        name: formatName(student.User.displayName),
        email: student.User.email,
        phoneNumber: student.User.phoneNumber,
        address: address,
        status,
      };
    });
    setData(tmpData);
    setDataSearch(tmpData);
  }, [students]);

  const handleSearch = value => {
    const dataTmp = data.filter(item => item.name.toLowerCase().search(value.toLowerCase()) >= 0);
    setDataSearch(dataTmp);
  };

  const handleDelete = id => {
    setVisibleModal(true);
    setIdStudent(id);
  };

  const handleDeleteStudent = () => {
    dispatch(deleteStudents.deleteStudentsRequest(idStudent));
    setVisibleModal(false);
    setIsDeleted(true);
  };

  useEffect(() => {
    if (isDeleted && students.isSuccess) {
      notification.success({
        message: 'Delete successfully',
        style: {
          width: 300,
        },
      });
    } else if (isDeleted && !students.isSuccess && students.error.length > 0) {
      notification.error();
      ({
        message: students.error,
        style: {
          width: 300,
        },
      });
    }
  }, [students.isLoading]);

  return (
    <div>
      <Modal
        centered
        title="Warning"
        visible={visibleModal}
        onOk={handleDeleteStudent}
        onCancel={() => setVisibleModal(false)}>
        Are you sure delete this student?
      </Modal>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Students</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={8} lg={10} xl={8}>
            <Search
              className="full"
              placeholder="Search by name"
              allowClear
              enterButton
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col flex="auto" />
          <Col span={4}>
            {role === 'admin' && (
              <Button type="primary" size="large" block>
                <Link to="/student/add">Add student</Link>
              </Button>
            )}
          </Col>
          <Col span={4}>
            <Button type="primary" size="large" block>
              <ExportCSV data={students.data} headers={studentHeadersExcel} type="student" />
            </Button>
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey={row => row.idStudent}
              dataSource={dataSearch}
              bordered
              pagination={{
                showSizeChanger: true,
                current: currentPage,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
              }}
              loading={students.isLoading}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Student;
