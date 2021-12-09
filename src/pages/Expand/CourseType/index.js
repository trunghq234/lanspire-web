import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Tooltip, Card, Input, Row, Col, Table, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AddCourseType from '../../../components/Course/AddCourseType';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$ } from 'redux/selectors';
import { deleteCourseType, getCourseTypes } from 'redux/actions/courseTypes';

const { confirm } = Modal;
const { Search } = Input;

const CourseType = () => {
  const columns = [
    {
      title: 'Type name',
      dataIndex: 'typeName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
      width: '40%',
    },
    {
      title: '',
      dataIndex: 'idCourseType',
      align: 'center',
      width: '10%',
      render: idCourseType => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="Edit information">
              <Link to={`/coursetype/${idCourseType}`}>
                <Button
                  onClick={() => setTrigger(!trigger)}
                  type="primary"
                  ghost
                  icon={<EditOutlined />}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => handleDelete(idCourseType)} danger icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(courseTypeState$);
  useEffect(() => {
    dispatch(getCourseTypes.getCourseTypesRequest());
  }, []);

  const handleDelete = id => {
    confirm({
      title: 'Do you want to delete this course type?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        dispatch(deleteCourseType.deleteCourseTypeRequest(id));

        isSuccess
          ? message['success']({
              content: 'Deleted successfully',
              style: {
                marginTop: '20vh',
              },
            })
          : message['error']({
              content: 'Error',
              style: {
                marginTop: '20vh',
              },
            });
      },
      onCancel() {},
    });
  };

  const [dataSource, setDataSource] = useState([]);
  const handleSearch = value => {
    const dataTmp = data.filter(
      item => item.typeName.toLowerCase().search(value.toLowerCase()) >= 0
    );
    setDataSource(dataTmp);
  };
  useEffect(() => {
    setDataSource(data);
  }, [data]);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Course type</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Course type</h3>
      <Row gutter={[20, 20]}>
        <Col xs={{ order: 1 }} sm={{ order: 1 }} lg={{ order: 0 }} span={24} xl={16}>
          <Card>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={16} xl={12}>
                <Search
                  size="large"
                  placeholder="Search by name"
                  allowClear
                  enterButton
                  onSearch={handleSearch}
                />
              </Col>
              <Col span={24}>
                <Table
                  bordered
                  loading={isLoading}
                  columns={columns}
                  dataSource={dataSource}
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
        <Col lg={{ order: 1 }} span={24} xl={8}>
          <Card>
            <AddCourseType trigger={trigger} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CourseType;
