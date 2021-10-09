import React from 'react';
import { Button, Card, Input, Select, Table, Tag, Tooltip, Breadcrumb, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { NavLink } from 'react-router-dom';

const { Option } = Select;
const { Search } = Input;

function handleChange(value) {
  console.log(`selected ${value}`);
}
const onSearch = value => console.log(value);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'Full name',
    dataIndex: 'name',
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    align: 'center',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: status => (
      <span>
        {status ? <Tag color="success">Working</Tag> : <Tag color="orange">Unemployed</Tag>}
      </span>
    ),
  },
  {
    title: '',
    dataIndex: 'editable',
    align: 'center',
    render: editable => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Tooltip title="Edit information">
            <Button
              type="primary"
              ghost
              disabled={editable ? true : false}
              icon={<EditOutlined />}
            />
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
    key: '1',
    id: '1',
    name: 'Nguyen Van A',
    phoneNumber: '123',
    level: 'IELTS 6.0',
    status: false,
    editable: true,
  },
  {
    key: '2',
    id: '2',
    name: 'Nguyen Van B',
    phoneNumber: '123',
    level: 'IELTS 8.0',
    status: true,
    editable: false,
  },
];

const Lecturer = () => {
  return (
    <>
      <Breadcrumb style={{ marginBottom: '20px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Lecturer list</h3>
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
              onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="working">Working</Option>
              <Option value="unemployed">Unemployed</Option>
            </Select>
          </Col>
          <Col xs={0} md={2} lg={4} xl={8} flex="auto" />
          <Col xs={24} sm={24} md={6} lg={6} xl={4}>
            <Button className={styles.btn} size="large" type="primary">
              <NavLink to="/lecturer/add">Add lecturer</NavLink>
            </Button>
          </Col>
          <Col span={24}>
            <Table bordered columns={columns} dataSource={data} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Lecturer;
