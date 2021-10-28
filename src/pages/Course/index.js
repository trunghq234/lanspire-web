import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  Select,
  Table,
  Row,
  Col,
  Tooltip,
  notification,
  Modal,
} from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { courseState$ } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getCourses } from 'redux/actions/courses';
import styles from './index.module.less';

const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

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
    },
    {
      title: 'Type',
      dataIndex: 'courseType',
      align: 'center',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      align: 'center',
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
              <Link to={`/course/add/${idCourse}`}>
                <Button type="primary" ghost icon={<EditOutlined />}></Button>
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(idCourse)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onSearch = value => console.log(value);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(courseState$);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(getCourses.getCoursesRequest());
  }, []);

  const mappingDatasource = dataInput => {
    const res = [];
    dataInput.map(course => {
      const { levelName, point } = course.Level;
      const { typeName } = course.CourseType;
      res.push({
        idCourse: course.idCourse,
        courseName: course.courseName,
        fee: parseInt(course.fee),
        description: course.description,
        level: `${levelName} (${point})`,
        courseType: typeName,
      });
    });
    setDataSource(res);
  };

  const handleDelete = idCourse => {
    confirm({
      title: 'Do you want to delete this course?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        dispatch(deleteCourse.deleteCourseRequest(idCourse));

        isSuccess
          ? notification['success']({
              message: 'Successfully',
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            })
          : notification['error']({
              message: 'Notification Title',
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    mappingDatasource(data);
  }, [data]);
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
              loading={isLoading}
              columns={columns}
              dataSource={dataSource}
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
