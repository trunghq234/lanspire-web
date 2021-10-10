import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Table, Input, Button, Select, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: 'No.',
    key: 'id',
    dataIndex: 'id',
    width: '100px',
    align: 'center',
    render: (text, row, index) => <span>{index + 1}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name > b.name,
    ellipsis: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    align: 'center',
  },
  {
    title: 'Current course',
    dataIndex: 'currentCourse',
    key: 'currentCourse',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
  {
    key: 'actions',
    width: '100px',
    render: () => {
      return (
        <div className={styles.actions}>
          <EditOutlined className={styles.btn_Edit} />
          <DeleteOutlined className={styles.btn_Delete} />
        </div>
      );
    },
  },
];

var data = [
  {
    key: 1,
    name: 'John Brown',
    gender: 'Male',
    phoneNumber: '0123456789',
    level: 'IELTS 6.0',
    currentCourse: 'Beginner',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 2,
    name: 'John Wich',
    gender: 'Male',
    phoneNumber: '0123456789',
    level: 'IELTS 5.0',
    currentCourse: 'Communications, Writing',
    address: 'London No. 1 Lake Park',
  },
  {
    key: 3,
    name: 'Joe Black',
    gender: 'Male',
    phoneNumber: '0123456789',
    level: 'IELTS 7.5',
    currentCourse: 'Writing, Listening',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 4,
    name: 'Jim Red',
    gender: 'Male',
    phoneNumber: '0123456789',
    level: 'TOEIC 800',
    currentCourse: 'IELTS Advantage',
    address: 'London No. 2 Lake Park',
  },
];

for (var i = 5; i <= 20; i++) {
  const tmp = {
    key: i,
    name: `Student ${i}`,
    gender: 'Female',
    phoneNumber: '0123456789',
    level: `TOEIC ${i * 5 + 450}`,
    currentCourse: 'TOEIC 450+',
    address: 'London No. 2 Lake Park',
  };
  data.push(tmp);
}

const Student = () => {
  const history = useHistory();

  const [data1, setData1] = useState(data);

  const handleFilterLevel = (value, index) => {
    if (value === 'All') {
      setData1(data);
      return;
    }
    const dataTmp = data.filter(x => x.level.split(' ')[0] === value);
    setData1(dataTmp);
  };

  const handleClickAddNewStudent = () => {
    history.push('/student/add');
  };
  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <Search
          className={styles.search_name}
          placeholder="Enter name ..."
          enterButton
          size="large"
        />
        <Select
          className={styles.filter}
          defaultValue="All"
          size="large"
          onChange={handleFilterLevel}>
          <Option value="All">All levels</Option>
          <Option value="IELTS">IELTS</Option>
          <Option value="TOEIC">TOEIC</Option>
        </Select>
        <Button className={styles.add_student} size="large" onClick={handleClickAddNewStudent}>
          Add student
        </Button>
      </div>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};

export default Student;
