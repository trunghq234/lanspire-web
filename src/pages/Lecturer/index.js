import React from 'react';
import { Button, Card, Input, Select, Table, Tag, Tooltip, Breadcrumb } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';

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
    <div>
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
        <div className={styles.wrapper}>
          <div>
            <Search
              className={styles.search}
              size="large"
              placeholder="Search"
              allowClear
              enterButton
              onSearch={onSearch}
            />
            <Select
              className={styles.select}
              size="large"
              defaultValue="all"
              onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="working">Working</Option>
              <Option value="unemployed">Unemployed</Option>
            </Select>
          </div>
          <Button className={styles.btn} size="large" type="primary">
            Add lecturer
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Lecturer;
