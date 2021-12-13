import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Tooltip, Card, Input, Row, Col, Table, message } from 'antd';
import { Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AddLevel from '../../../components/Course/AddLevel';
import { useDispatch, useSelector } from 'react-redux';
import { levelState$ } from 'redux/selectors';
import { getLevels, deleteLevel } from 'redux/actions/levels';

const { confirm } = Modal;
const { Search } = Input;

const Level = () => {
  const columns = [
    {
      title: 'Level name',
      dataIndex: 'levelName',
    },
    {
      title: 'Point',
      dataIndex: 'point',
      align: 'center',
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: 'Language',
      dataIndex: 'language',
      align: 'center',
    },
    {
      title: '',
      dataIndex: 'idLevel',
      align: 'center',
      width: '10%',
      render: idLevel => {
        return (
          <div className="flex">
            <Tooltip title="Edit level">
              <Link to={`/level/${idLevel}`}>
                <Button type="primary" ghost icon={<EditOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => handleDelete(idLevel)} danger icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(levelState$);
  useEffect(() => {
    dispatch(getLevels.getLevelsRequest());
  }, []);

  const handleDelete = id => {
    confirm({
      title: 'Do you want to delete this level?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      centered: true,
      onOk() {
        dispatch(deleteLevel.deleteLevelRequest(id));

        isSuccess
          ? message.success({
              content: 'Deleted successfully',
            })
          : message.error({
              content: 'Error',
            });
      },
    });
  };

  const [dataSource, setDataSource] = useState([]);
  const handleSearch = value => {
    const dataTmp = data.filter(
      item => item.levelName.toLowerCase().search(value.toLowerCase()) >= 0
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
        <Breadcrumb.Item>Level</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Level</h3>
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
                  rowKey={row => row.idLevel}
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
            <AddLevel />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Level;
