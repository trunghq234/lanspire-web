import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Table, Input, Button, Tag, Col, Row, Modal, notification, Breadcrumb, Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { studentState$ } from 'redux/selectors/index';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudents, getStudents } from 'redux/actions/students';

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
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
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
          text: 'Studying',
          value: true,
        },
        {
          text: 'No study',
          value: false,
        },
      ],
      defaultFilteredValue: [true],
      render: (status, index) => {
        const color = status ? 'blue' : 'gray';
        return (
          <Tag color={color} key={index}>
            {status ? 'Studying' : 'No study'}
          </Tag>
        );
      },
      responsive: ['sm'],
      onFilter: (value, record) => record.status === value,
    },
    {
      key: 'actions',
      width: '100px',
      render: record => {
        return (
          <div className={styles['actions-for-item']}>
            <EditOutlined
              className={styles['btn-edit']}
              onClick={() => handleEditStudent(record.idStudent)}
            />
            <DeleteOutlined
              className={styles['btn-delete']}
              onClick={() => onDelete(record.idStudent)}
            />
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
  const [visibleModal, setVisibleModal] = useState(false);
  const [idStudent, setIdStudent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const history = useHistory();
  useEffect(() => {
    dispatch(getStudents.getStudentsRequest());
  }, []);

  //Custom data
  useEffect(() => {
    const tmpData = students.data.map((student, index) => {
      const address = `${student.User.address[0]}, ${student.User.address[1]}, ${student.User.address[2]}`;
      return {
        idStudent: student.idStudent,
        name: student.User.displayName,
        email: student.User.email,
        phoneNumber: student.User.phoneNumber,
        address: address,
        status: !student.isDeleted,
      };
    });
    setData(tmpData);
    setDataSearch(tmpData);
  }, [students]);

  const handleClickAddNewStudent = () => {
    history.push('/student/add');
  };

  const handleSearch = value => {
    const dataTmp = data.filter(item => item.name.toLowerCase().search(value.toLowerCase()) >= 0);
    setDataSearch(dataTmp);
  };
  const onDelete = id => {
    setVisibleModal(true);
    setIdStudent(id);
  };
  const handleDeleteStudent = () => {
    dispatch(deleteStudents.deleteStudentsRequest(idStudent));
    setVisibleModal(false);
    setIsDeleted(true);
  };
  const handleEditStudent = id => {
    history.push(`/student/edit/${id}`);
  };

  useEffect(() => {
    if (isDeleted && students.isSuccess) {
      notification.success({
        message: 'Delete successfully',
        style: {
          width: 300,
        },
      });
    } else if (isDeleted && students.isSuccess && students.error.length > 0) {
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
    <div className={styles.container}>
      <Modal
        title="Warning"
        visible={visibleModal}
        onOk={handleDeleteStudent}
        onCancel={() => setVisibleModal(false)}>
        Are you sure delete this student?
      </Modal>
      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <a href="/">Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className={styles.title}>Student list</h2>
      <Card>
        <Row
          gutter={[
            { xs: 0, sm: 0, md: 10, lg: 10 },
            { xs: 5, sm: 5, md: 0, lg: 0 },
          ]}
          className={styles['actions-for-list']}>
          <Col xs={24} sm={24} md={8} lg={10} xl={8}>
            <Search
              className={styles['search-name']}
              placeholder="Enter name ..."
              enterButton
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={{ span: 5, offset: 11 }}
            lg={{ span: 4, offset: 10 }}
            xl={{ span: 3, offset: 13 }}>
            <Button
              className={styles['add-student']}
              size="large"
              onClick={handleClickAddNewStudent}>
              Add student
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={dataSearch.id}
          dataSource={dataSearch}
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
      </Card>
    </div>
  );
};
export default Student;
