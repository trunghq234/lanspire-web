import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$ } from 'redux/selectors';
import styles from './index.module.less';

const { Option } = Select;
const { Search } = Input;

const mapToDataSource = array => {
  return array.map(item => {
    return {
      key: item.idEmployee,
      idEmployee: item.idEmployee,
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

const Employee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector(employeeState$);
  const dataSource = mapToDataSource(employees);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'idEmployee',
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
      dataIndex: 'idEmployee',
      align: 'center',
      render: idEmployee => (
        // <Link to={'/employee/' + idEmployee}>
        <div style={{ display: 'flex', justifyContent: 'center', columnGap: '20px' }}>
          <Button
            type="primary"
            onClick={() => handleEditEmployee(idEmployee)}
            ghost
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => handleDeleteEmployee(idEmployee)}
            danger
            icon={<DeleteOutlined />}
          />
        </div>
        // </Link>
      ),
    },
  ];

  React.useEffect(() => {
    dispatch(employeeActions.getEmployees.getEmployeesRequest());
  }, [dispatch]);

  const onSearch = () => {};
  const handleChange = () => {};
  const handleAddEmployee = () => {
    history.push('/employee/add');
  };
  const handleDeleteEmployee = idEmployee => {
    dispatch(employeeActions.deleteEmployee.deleteEmployeeRequest(idEmployee));
  };
  const handleEditEmployee = idEmployee => {
    history.push(`/employee/edit/${idEmployee}`);
  };

  console.log({ dataSource });

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
        <Table columns={columns} dataSource={dataSource} rowKey={row => row.idEmployee} />
      </Card>
    </div>
  );
};

export default Employee;
