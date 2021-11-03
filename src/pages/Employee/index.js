import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Select, Table, Tag, Modal, notification } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$ } from 'redux/selectors';
import styles from './index.module.less';

const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

const mapToDataSource = array => {
  return array.map(item => {
    return {
      key: item.idEmployee,
      idEmployee: item.idEmployee,
      username: item.username === null ? 'null' : item.username,
      displayName: item.displayName,
      email: item.email,
      gender: item.gender === 0 ? 'Male' : item.gender === 1 ? 'Female' : 'Others',
      phoneNumber: item.phoneNumber,
      address: item.address,
      birthday: moment(item.dob).format('DD/MM/YYYY'),
      isActivated: item.isActivated,
    };
  });
};

const Employee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector(employeeState$);
  const dataSource = mapToDataSource(employees.data);
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
      ellipsis: true,
    },
    {
      title: 'Full name',
      dataIndex: 'displayName',
      filterDropdown: () => {
        return <Input placeholder="Type text here" />;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
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
  const handleAddEmployeeClick = () => {
    history.push('/employee/add');
  };
  const handleDeleteEmployee = idEmployee => {
    confirm({
      title: 'Do you want to delete this employee?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        dispatch(employeeActions.deleteEmployee.deleteEmployeeRequest(idEmployee));

        employees.isSuccess
          ? notification['success']({
              message: 'Successfully',
              description: 'Delete employee success',
            })
          : notification['error']({
              message: 'Notification Title',
              description: 'That employee is activating',
            });
      },
      onCancel() {},
    });
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
          <Button
            className={styles.btn}
            size="large"
            type="primary"
            onClick={handleAddEmployeeClick}>
            Add employee
          </Button>
        </div>
        <Table
          columns={columns}
          loading={employees.isLoading}
          dataSource={dataSource}
          rowKey={row => row.idEmployee}
        />
      </Card>
    </div>
  );
};

export default Employee;
