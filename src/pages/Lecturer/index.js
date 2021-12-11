import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Input, Modal, Row, Table, Tag } from 'antd';
import ExportCSV from 'components/common/ExportCSV';
import { lecturerHeadersExcel } from 'constant/headersExcel';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as lecturerActions from 'redux/actions/lecturers';
import { lecturerState$ } from 'redux/selectors';

const { confirm } = Modal;
const { Search } = Input;

const mapToDataSource = array => {
  return array.map(item => {
    return {
      key: item.idLecturer,
      idLecturer: item.idLecturer,
      idUser: item.idUser,
      username: item.User.username === null ? 'null' : item.User.username,
      displayName: item.User.displayName,
      email: item.User.email,
      gender: item.User.gender === 0 ? 'Male' : item.User.gender === 1 ? 'Female' : 'Others',
      phoneNumber: item.User.phoneNumber,
      address: `${item.User.address[0]}, ${item.User.address[1]}, ${item.User.address[2]}`,
      birthday: moment(item.User.dob).format('DD/MM/YYYY'),
      isActivated: item.User.isActivated,
      isDeleted: item.isDeleted,
    };
  });
};

const Lecturer = () => {
  let initColumns = [
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
      width: '10%',
      filterSearch: true,
      onFilter: (value, record) => record.gender.startsWith(value),
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: 'DOB',
      dataIndex: 'birthday',
      align: 'center',
      ellipsis: true,
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'isActivated',
      align: 'center',
      width: '10%',
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
          {isActivated ? <Tag color="success">Working</Tag> : <Tag color="orange">Unworking</Tag>}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'idLecturer',
      align: 'center',
      width: '10%',
      render: idLecturer => (
        <div className="flex">
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
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [role, setRole] = useState();
  const lecturers = useSelector(lecturerState$);
  const [columns, setColumns] = useState(initColumns);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      initColumns.pop();
      setColumns(initColumns);
    }
    setRole(role);
    dispatch(lecturerActions.getLecturers.getLecturersRequest());
  }, []);

  useEffect(() => {
    const mapLecturersToData = mapToDataSource(lecturers.data);
    setDataSource(mapLecturersToData);
    setFilteredData(mapLecturersToData);
  }, [lecturers]);

  const handleAddLecturerClick = () => {
    history.push('/lecturer/add');
  };
  const handleEditLecturer = idLecturer => {
    history.push(`/lecturer/edit/${idLecturer}`);
  };
  const handleDeleteLecturer = idLecturer => {
    confirm({
      title: 'Do you want to delete this lecturer?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        const lecturer = lecturers.data.find(lecturer => lecturer.idLecturer === idLecturer);
        dispatch(lecturerActions.deleteLecturer.deleteLecturerRequest(lecturer));
      },
      onCancel() {},
    });
  };
  const handleSearch = value => {
    const dataSearch = dataSource.filter(
      item => item.displayName.toLowerCase().search(value.toLowerCase()) >= 0
    );
    setFilteredData(dataSearch);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Lecturers</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Lecturers</h3>
      <Card>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={16} md={10} lg={8} xl={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search by name"
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </Col>
          <Col flex="auto" />
          <Col xs={24} sm={24} md={6} lg={6} xl={4}>
            {role === 'admin' && (
              <Button block onClick={handleAddLecturerClick} size="large" type="primary">
                Add lecturer
              </Button>
            )}
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={4}>
            <Button block size="large" type="primary">
              <ExportCSV data={lecturers.data} headers={lecturerHeadersExcel} type="lecturer" />
            </Button>
          </Col>
          <Col span={24}>
            <Table
              bordered={true}
              loading={lecturers.isLoading}
              columns={columns}
              dataSource={filteredData}
              rowKey={row => row.idLecturer}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Lecturer;
