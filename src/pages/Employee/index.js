import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Table, Tag } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from 'redux/actions/posts';
import { postState$ } from 'redux/selectors';
import styles from './index.module.less';

const { Option } = Select;
const { Search } = Input;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'Full name',
    dataIndex: 'fullName',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    align: 'center',
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    align: 'center',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: 'center',
  },
  {
    title: 'Birthday',
    dataIndex: 'birthday',
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
    render: editable => (
      <div style={{ display: 'flex', justifyContent: 'center', columnGap: '20px' }}>
        <Button
          onClick={() => handleEditBtn(editable)}
          type="primary"
          ghost
          disabled={editable.disable ? true : false}
          icon={<EditOutlined />}
        />
        <Button danger icon={<DeleteOutlined />} />
      </div>
    ),
  },
];

const dataSource = [
  {
    key: '1',
    id: '1',
    fullName: 'Nguyen Van A',
    gender: 'Male',
    phoneNumber: '123',
    address: 'Abcd xyz',
    birthday: '01/01/1999',
    status: true,
    editable: {
      id: '1',
      fullName: 'Nguyen Van A',
      gender: 'Male',
      phoneNumber: '123',
      address: 'Abcd xyz',
      birthday: '01/01/1999',
      disable: false,
    },
  },
  {
    key: '2',
    id: '2',
    fullName: 'Nguyen Van B',
    gender: 'Female',
    phoneNumber: '123',
    address: 'Abcd xyz',
    birthday: '02/01/1979',
    status: true,
    editable: {
      id: '2',
      fullName: 'Nguyen Van B',
      gender: 'Female',
      phoneNumber: '123',
      address: 'Abcd xyz',
      birthday: '02/01/1979',
      disable: false,
    },
  },
  {
    key: '3',
    id: '3',
    fullName: 'Nguyen Van C',
    gender: 'Male',
    phoneNumber: '123',
    address: 'Abcd xyz',
    birthday: '01/01/1992',
    status: true,
    editable: {
      id: '3',
      fullName: 'Nguyen Van C',
      gender: 'Male',
      phoneNumber: '123',
      address: 'Abcd xyz',
      birthday: '01/01/1992',
      disable: false,
    },
  },
  {
    key: '4',
    id: '4',
    fullName: 'Nguyen Van D',
    gender: 'Male',
    phoneNumber: '123',
    address: 'Abcd xyz',
    birthday: '01/01/1929',
    status: false,
    editable: {
      id: '4',
      fullName: 'Nguyen Van D',
      gender: 'Male',
      phoneNumber: '123',
      address: 'Abcd xyz',
      birthday: '01/01/1929',
      disable: false,
    },
  },
  {
    key: '5',
    id: '5',
    fullName: 'Nguyen Van E',
    gender: 'Male',
    phoneNumber: '123',
    address: 'Abcd xyz',
    birthday: '01/01/1999',
    status: false,
    editable: {
      id: '5',
      fullName: 'Nguyen Van E',
      gender: 'Male',
      phoneNumber: '123',
      address: 'Abcd xyz',
      birthday: '01/01/1999',
      disable: false,
    },
  },
];

const handleEditBtn = editable => {
  console.log({ editable });
};

const Employee = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postState$);

  console.log({ posts });

  const onSearch = () => {};
  const handleChange = () => {};
  const handleAddEmployee = () => {
    let post = {
      title: 'new employee',
      description: 'new employee',
    };

    dispatch(createPost.createPostRequest(post));
  };

  return (
    <div>
      <h3>Employee List</h3>
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
              onClick={handleChange}>
              <Option value="all">All</Option>
              <Option value="working">Working</Option>
              <Option value="unemployed">Unemployed</Option>
            </Select>
          </div>
          <Button className={styles.btn} size="large" type="primary" onClick={handleAddEmployee}>
            Add employee
          </Button>
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </div>
  );
};

export default Employee;
