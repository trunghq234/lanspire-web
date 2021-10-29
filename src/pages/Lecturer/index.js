import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Input, Select, Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as lecturerActions from 'redux/actions/lecturers';
import { lectureState$ } from 'redux/selectors';
import styles from './index.module.less';

const { Option } = Select;
const { Search } = Input;

const mapToDataSource = array => {
  return array.map(item => {
    return {
      key: item.idLecturer,
      idLecturer: item.idLecturer,
      username: item.username === null ? 'null' : item.username,
      displayName: item.displayName,
      gender: item.gender,
      phoneNumber: item.phoneNumber,
      address: item.address,
      birthday: moment(new Date()).format('DD/MM/YYYY'),
      isActivated: item.isActivated,
    };
  });
};

const Lecturer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const lecturers = useSelector(lectureState$);
  const dataSource = mapToDataSource(lecturers);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'idLecturer',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: 'Full name',
      dataIndex: 'displayName',
      ellipsis: true,
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
      dataIndex: 'isActivated',
      align: 'center',
      render: isActivated => (
        <span>
          {isActivated ? <Tag color="success">Working</Tag> : <Tag color="orange">Unemployed</Tag>}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'idLecturer',
      align: 'center',
      render: idLecturer => (
        // <Link to={'/employee/' + idLecturer}>
        <div style={{ display: 'flex', justifyContent: 'center', columnGap: '20px' }}>
          <Button
            onClick={() => handleEditLecturer(idLecturer)}
            type="primary"
            ghost
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => handleDeleteLecturer(idLecturer)}
            danger
            icon={<DeleteOutlined />}
          />
        </div>
        // </Link>
      ),
    },
  ];

  React.useEffect(() => {
    dispatch(lecturerActions.getLecturers.getLecturersRequest());
  }, [dispatch]);

  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const onSearch = value => console.log(value);
  const handleEditLecturer = idLecturer => {
    history.push(`/lecturer/edit/${idLecturer}`);
  };
  const handleDeleteLecturer = idLecturer => {
    dispatch(lecturerActions.deleteLecturer.deleteLecturerRequest(idLecturer));
  };

  console.log({ dataSource });

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
        <Table columns={columns} dataSource={dataSource} rowKey={row => row.idLecturer} />
      </Card>
    </div>
  );
};

export default Lecturer;
