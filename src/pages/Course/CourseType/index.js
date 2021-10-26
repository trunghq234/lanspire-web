import React, { useEffect } from 'react';
import { Breadcrumb, Button, Tooltip, Card, Input, Row, Col, Select, Table, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddCourseType from '../AddCourseType';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$ } from 'redux/selectors';
import { deleteCourseType, getCourseTypes } from 'redux/actions/coursesType';

const { Search } = Input;

const CourseType = () => {
  const columns = [
    {
      title: 'Type name',
      dataIndex: 'typeName',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      align: 'center',
      width: '30%',
      sorter: {
        compare: (a, b) => a.language.localeCompare(b.language),
      },
    },
    {
      title: '',
      dataIndex: 'idCourseType',
      align: 'center',
      width: '10%',
      render: id => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="Edit information">
              <Button type="primary" ghost icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => handleDelete(id)} danger icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(courseTypeState$);
  useEffect(() => {
    dispatch(getCourseTypes.getCourseTypesRequest());
  }, []);

  const handleDelete = id => {
    dispatch(deleteCourseType.deleteCourseTypeRequest(id));
    isSuccess ? message.success('Successfully delete course type', 2) : message.error('Error', 2);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Course type</Breadcrumb.Item>
      </Breadcrumb>
      <h3>Course type</h3>
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <Card>
            <Row gutter={[20, 20]} align="top">
              <Col xs={24} sm={16} md={10}>
                <Search
                  size="large"
                  placeholder="Search"
                  allowClear
                  enterButton
                  onSearch={e => console.log(e)}
                />
              </Col>
              {/* <Col xs={24} sm={8} md={6} lg={6} xl={4}>
                <Select
                  className={styles.select}
                  size="large"
                  defaultValue="all"
                  onChange={e => console.log(e)}>
                  <Option value="all">All</Option>
                  <Option value="working">Working</Option>
                  <Option value="unemployed">Unemployed</Option>
                </Select>
              </Col> */}
              <Col span={24}>
                <Table
                  bordered
                  loading={isLoading}
                  columns={columns}
                  dataSource={data}
                  rowKey={row => row.idCourseType}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100'],
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <AddCourseType />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CourseType;
