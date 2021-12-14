import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
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
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { deleteCourse, getCourses } from 'redux/actions/courses';
import { courseState$ } from 'redux/selectors';
import ExportCSV from 'components/common/ExportCSV';
import { courseHeadersExcel } from 'constant/headersExcel';

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
          <div className={role === 'admin' && 'flex'}>
            <Tooltip title="View details">
              <Link to={`/course/details/${idCourse}`}>
                <Button icon={<EyeOutlined />} />
              </Link>
            </Tooltip>
            {role === 'admin' && (
              <Tooltip title="Edit information">
                <Link to={`/course/edit/${idCourse}`}>
                  <Button type="primary" ghost icon={<EditOutlined />} />
                </Link>
              </Tooltip>
            )}
            {role === 'admin' && (
              <Tooltip title="Delete">
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(idCourse)} />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(courseState$);
  const [dataSource, setDataSource] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
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
          ? notification.success({
              message: 'Deleted successfully',
            })
          : notification.error({
              message: 'Error',
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
      <h3 className="heading">Courses</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={16} md={10} lg={8} xl={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search by name"
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </Col>
          <Col flex="auto" />
          <Col span={4}>
            {role === 'admin' && (
              <Button size="large" type="primary" block>
                <Link to="/course/add">Add course</Link>
              </Button>
            )}
          </Col>
          <Col span={4}>
            <Button size="large" type="primary" block>
              <ExportCSV data={data} headers={courseHeadersExcel} type="course" />
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
