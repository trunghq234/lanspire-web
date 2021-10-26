import { Breadcrumb, Button, Card, Input, Select, Table, Tag, Row, Col, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { courseState$ } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from 'redux/actions/courses';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { Option } = Select;
const { Search } = Input;

const Course = () => {
  const columns = [
    {
      title: 'Course name',
      dataIndex: 'courseName',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      align: 'center',
      width: '15%',
      render: text => <div>{text.toLocaleString()}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: '',
      dataIndex: 'idCourse',
      align: 'center',
      width: '10%',
      render: idCourse => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="Edit information">
              <Button type="primary" ghost icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      idCourse: '1',
      courseName: 'Luyen thi',
      level: 'IELTS 6.0',
      fee: 20000,
      description: 'lorem ispum',
    },
    {
      idCourse: '2',
      courseName: 'Luyen thi',
      level: 'IELTS 6.0',
      fee: 20000,
      description: 'lorem ispum',
    },
  ];

  const onSearch = value => console.log(value);
  const dispatch = useDispatch();
  const courses = useSelector(courseState$);

  useEffect(() => {
    dispatch(getCourses.getCoursesRequest());
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Courses</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Course</h3>
      <Card>
        <Row gutter={[20, 20]} align="top">
          <Col xs={24} sm={16} md={10} lg={8} xl={8}>
            <Search
              className={styles.search}
              size="large"
              placeholder="Search"
              allowClear
              enterButton
              onSearch={onSearch}
            />
          </Col>
          <Col xs={24} sm={8} md={6} lg={6} xl={4}>
            <Select
              className={styles.select}
              size="large"
              defaultValue="all"
              onChange={e => console.log(e)}>
              <Option value="all">All</Option>
              <Option value="working">Working</Option>
              <Option value="unemployed">Unemployed</Option>
            </Select>
          </Col>
          <Col xs={0} md={2} lg={4} xl={8} flex="auto" />
          <Col xs={24} sm={24} md={6} lg={6} xl={4}>
            <Button className={styles.btn} size="large" type="primary">
              <NavLink to="/course/add">Add course</NavLink>
            </Button>
          </Col>
          <Col span={24}>
            <Table
              bordered
              columns={columns}
              dataSource={data}
              rowKey={row => row.idCourse}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '15', '20'],
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Course;
