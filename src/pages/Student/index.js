import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Table, Input, Button, Select, Tooltip, Tag, Col, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import studentApi from 'api/studentApi';
import { studentState$ } from 'redux/selectors/index';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from 'redux/actions/students';

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: 'No.',
    key: 'id',
    dataIndex: 'id',
    width: '100px',
    align: 'center',
    render: (text, row, index) => <span>{index + 1}</span>,
    responsive: ['md'],
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name > b.name,
    ellipsis: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    align: 'center',
    responsive: ['xl'],
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    align: 'center',
    responsive: ['md'],
  },
  {
    title: 'Current courses',
    dataIndex: 'currentCourses',
    key: 'currentCourses',
    render: currentCourses => (
      <>
        {currentCourses.map(currentCourse => {
          let color = 'blue';
          return (
            <Tag color={color} key={currentCourse}>
              {currentCourse.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
    responsive: ['sm'],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
    responsive: ['xl'],
  },

  {
    key: 'actions',
    width: '100px',
    render: () => {
      return (
        <div className={styles['actions-for-item']}>
          <EditOutlined className={styles['btn-edit']} />
          <DeleteOutlined className={styles['btn-delete']} />
        </div>
      );
    },
  },
];

const Student = () => {
  const dispatch = useDispatch();
  const students = useSelector(studentState$);
  const [data, setData] = useState([]);
  dispatch(getStudents.getStudentsRequest());
  useEffect(() => {
    console.log(students);
  }, []);

  const history = useHistory();

  const handleFilterLevel = (value, index) => {
    // if (value === 'All') {
    //   setData1(data);
    //   return;
    // }
    // const dataTmp = data.filter(x => x.level.split(' ')[0] === value);
    // setData1(dataTmp);
  };

  const handleClickAddNewStudent = () => {
    history.push('/student/add');
  };
  return (
    <div className={styles.container}>
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
          />
        </Col>
        <Col xs={24} sm={24} md={5} lg={4} xl={3}>
          <Select
            className={styles.filter}
            defaultValue="All"
            size="large"
            onChange={handleFilterLevel}>
            <Option value="All">All levels</Option>
            <Option value="IELTS">IELTS</Option>
            <Option value="TOEIC">TOEIC</Option>
          </Select>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={{ span: 5, offset: 6 }}
          lg={{ span: 4, offset: 6 }}
          xl={{ span: 3, offset: 10 }}>
          <Button className={styles['add-student']} size="large" onClick={handleClickAddNewStudent}>
            Add student
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default Student;
