import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Select,
  Table,
  Input,
  Modal,
  Tooltip,
  notification,
  Progress,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.less';
import { deleteClass, getClasses } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { classState$, courseState$ } from 'redux/selectors';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Search } = Input;
const { confirm } = Modal;
const Class = () => {
  const max = 20;
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(classState$);
  const { data: courses } = useSelector(courseState$);

  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const columns = [
    {
      title: 'Class name',
      dataIndex: 'className',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      filters: dataFilter,
      filterSearch: true,
      onFilter: (value, record) => record.course.includes(value),
      width: '20%',
    },
    {
      title: 'Room',
      dataIndex: 'room',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      align: 'center',
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      align: 'center',
      sorter: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
    },
    {
      title: 'Students',
      dataIndex: 'student',
      align: 'center',
      sorter: (a, b) => a.student[0] - b.student[0],
      render: student => {
        return (
          <div>
            <Progress
              percent={student[0] * (100 / student[1])}
              format={() => `${student[0]}/${student[1]}`}
            />
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'idClass',
      align: 'center',
      width: '10%',
      render: idClass => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="Edit information">
              <Link to={`/class/add/${idClass}`}>
                <Button type="primary" ghost icon={<EditOutlined />}></Button>
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(idClass)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const onSearch = value => console.log(value);
  const mappingDatasource = dataInput => {
    const res = [];
    dataInput.map(classRoom => {
      const course = classRoom.Course;
      let courseName = '';
      if (course) {
        courseName = course.courseName;
      }
      const learnings = classRoom.Learnings;
      let students = [];
      if (learnings) {
        students = learnings.filter(
          (v, i, a) =>
            a.findIndex(t => t.idStudent === v.idStudent && t.idClass === v.idClass) === i
        );
      }
      res.push({
        idClass: classRoom.idClass,
        className: classRoom.className,
        room: classRoom.room,
        startDate: new Date(classRoom.startDate).toLocaleDateString('en-US'),
        endDate: new Date(classRoom.endDate).toLocaleDateString('en-US'),
        course: courseName,
        student: [students.length, max],
      });
    });
    setDataSource(res);
  };
  const mappingFilter = dataInput => {
    let res = [];
    dataInput.map(course => {
      // const course = classRoom.Course;
      // let courseName = '';
      // if (course) {
      //   courseName = course.courseName;
      // }
      res.push({
        value: course.courseName,
        text: course.courseName,
      });
    });
    res = res.filter((v, i, a) => a.findIndex(t => t.value === v.value) === i);
    setDataFilter(res);
  };
  const handleDelete = idClass => {
    confirm({
      title: 'Do you want to delete this class?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        dispatch(deleteClass.deleteClassRequest(idClass));

        isSuccess
          ? notification['success']({
              message: 'Successfully',
              description: 'Delete class success',
            })
          : notification['error']({
              message: 'Notification Title',
              description: 'That class is activating',
            });
      },
      onCancel() {},
    });
  };
  useEffect(() => {
    mappingDatasource(data);
    mappingFilter(courses);
  }, [data, courses]);
  useEffect(() => {
    dispatch(getCourses.getCoursesRequest());
  }, []);
  useEffect(() => {
    dispatch(getClasses.getClassesRequest());
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Classes</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Class</h3>
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
          <Col xs={0} md={8} lg={10} xl={12} flex="auto" />
          <Col xs={24} sm={24} md={6} lg={6} xl={4}>
            <Button className={styles.btn} size="large" type="primary">
              <NavLink to="/class/add">Add Class</NavLink>
            </Button>
          </Col>
          <Col span={24}>
            <Table
              bordered
              columns={columns}
              dataSource={dataSource}
              loading={isLoading}
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

export default Class;
