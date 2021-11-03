import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Modal, notification, Space, Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$ } from 'redux/selectors';
import styles from './index.module.less';

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
  const [searchText, setSearchText] = React.useState('');
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
      ellipsis: true,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              autoFocus
              placeholder="Type text here"
              style={{ marginBottom: 8, display: 'block', fontSize: '14px' }}
              value={selectedKeys[0]}
              onChange={event => {
                setSelectedKeys(event.target.value ? [event.target.value] : []);
              }}
              onPressEnter={() => {
                handleSearch(selectedKeys, confirm);
              }}
            />

            <Space>
              <Button
                type="primary"
                style={{ width: 90, fontSize: '12px' }}
                onClick={() => {
                  handleSearch(selectedKeys, confirm);
                }}
                icon={<SearchOutlined />}
                size="small">
                Search
              </Button>
              <Button
                style={{ width: 90, fontSize: '12px' }}
                onClick={() => {
                  handleReset(clearFilters);
                }}
                size="small">
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.displayName.toLowerCase().includes(value.toLowerCase());
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
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
      ),
    },
  ];

  React.useEffect(() => {
    dispatch(employeeActions.getEmployees.getEmployeesRequest());
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
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
