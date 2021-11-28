import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Input, Modal, notification, Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$ } from 'redux/selectors';
import styles from './index.module.less';
import { CSVLink } from 'react-csv';

const { confirm } = Modal;
const { Search } = Input;

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
  const [dataSource, setDataSource] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector(employeeState$);
  const columns = [
    {
      title: 'Full name',
      dataIndex: 'displayName',
      ellipsis: true,
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
      filters: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
        { text: 'Others', value: 'Others' },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.gender.startsWith(value),
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
      filters: [
        { text: 'Working', value: true },
        { text: 'Unworking', value: false },
      ],
      filterSearch: true,
      onFilter: (value, record) => {
        if (record.isActivated === value) return true;
      },
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
  React.useEffect(() => {
    const mapEmployeeToData = mapToDataSource(employees.data);
    setDataSource(mapEmployeeToData);
    setFilteredData(mapEmployeeToData);
  }, [employees]);

  const handleAddEmployee = () => {
    history.push('/employee/add');
  };
  const handleDeleteEmployee = idEmployee => {
    confirm({
      title: 'Do you want to delete this employee?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        const employee = employees.data.find(employee => employee.idEmployee === idEmployee);
        dispatch(employeeActions.deleteEmployee.deleteEmployeeRequest(employee));
      },
      onCancel() {},
    });
  };
  const handleEditEmployee = idEmployee => {
    history.push(`/employee/edit/${idEmployee}`);
  };
  const handleSearch = value => {
    const dataSearch = dataSource.filter(
      item => item.displayName.toLowerCase().search(value.toLowerCase()) >= 0
    );
    setFilteredData(dataSearch);
  };

  const headersExcel = [
    {
      label: 'Full name',
      key: 'displayName',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Gender',
      key: 'gender',
    },
    {
      label: 'Phone number',
      key: 'phoneNumber',
    },
    {
      label: 'Address',
      key: 'address',
    },
    {
      label: 'Birthday',
      key: 'birthday',
    },
    {
      label: 'Status',
      key: 'isActivated',
    },
  ];

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
              onSearch={handleSearch}
            />
          </div>
          <div>
            <Button
              style={{ marginRight: '20px' }}
              className={styles.btn}
              size="large"
              type="primary"
              onClick={handleAddEmployee}>
              Add employee
            </Button>
            <Button className={styles.btn} size="large" type="primary">
              <CSVLink
                filename={'Expense_Table.csv'}
                data={dataSource}
                headers={headersExcel}
                className="btn btn-primary">
                Export to CSV
              </CSVLink>
            </Button>
          </div>
        </div>
        <Table
          bordered={true}
          columns={columns}
          loading={employees.isLoading}
          dataSource={filteredData}
          rowKey={row => row.idEmployee}
        />
      </Card>
    </div>
  );
};

export default Employee;
