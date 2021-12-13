import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Input, Modal, Table, Tag } from 'antd';
import ExportCSV from 'components/common/ExportCSV';
import { employeeHeadersExcel } from 'constant/headersExcel';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as employeeActions from 'redux/actions/employees';
import { employeeState$ } from 'redux/selectors';
import styles from './index.module.less';

const { confirm } = Modal;
const { Search } = Input;

const mapToDataSource = array => {
  return array.map(item => {
    return {
      key: item.idEmployee,
      idEmployee: item.idEmployee,
      idUser: item.idUser,
      username: item.User.username === null ? 'null' : item.User.username,
      displayName: item.User.displayName,
      email: item.User.email,
      gender: item.User.gender === 0 ? 'Male' : item.User.gender === 1 ? 'Female' : 'Others',
      phoneNumber: item.User.phoneNumber,
      address: item.User.address,
      birthday: moment(item.User.dob).format('DD/MM/YYYY'),
      isActivated: item.User.isActivated,
      isDeleted: item.isDeleted,
    };
  });
};

const Employee = () => {
  const employees = useSelector(employeeState$);
  const [dataSource, setDataSource] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
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

  // get list from API
  React.useEffect(() => {
    dispatch(employeeActions.getEmployees.getEmployeesRequest());
  }, []);

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

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Employees</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Employee list</h3>
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
              <ExportCSV data={employees.data} headers={employeeHeadersExcel} type="employee" />
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
