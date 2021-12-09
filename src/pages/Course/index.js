import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Breadcrumb, Button, Card, Input, Table, Row, Col, Tooltip, message, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { courseState$ } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getCourses } from 'redux/actions/courses';
import styles from './index.module.less';

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
      title: 'Fee (₫)',
      dataIndex: 'fee',
      align: 'center',
      sorter: (a, b) => a.fee - b.fee,
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
            <Tooltip title="View details">
              <Link to={`/course/details/${idCourse}`}>
                <Button icon={<EyeOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title="Edit information">
              <Link to={`/course/edit/${idCourse}`}>
                <Button type="primary" ghost icon={<EditOutlined />} />
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
      centered: true,
      content: '',
      onOk() {
        dispatch(deleteCourse.deleteCourseRequest(idCourse));

        isSuccess
          ? message.success({
              content: 'Deleted successfully',
            })
          : message.error({
              content: 'Error',
            });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    mappingDatasource(data);
  }, [data]);

  const handleSearch = value => {
    const dataTmp = data.filter(
      item => item.courseName.toLowerCase().search(value.toLowerCase()) >= 0
    );
    mappingDatasource(dataTmp);
  };
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
              placeholder="Search by name"
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </Col>
          <Col flex="auto" />
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
