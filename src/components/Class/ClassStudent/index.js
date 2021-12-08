import { Col, Input, Row, Table } from 'antd';
import studentApi from 'api/studentApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const { Search } = Input;

const ClassStudent = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      ellipsis: true,
      width: '24%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['lg'],
      ellipsis: true,
      width: '24%',
    },
    {
      width: '15%',
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      ellipsis: 'true',
      responsive: ['md'],
      width: '15%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      ellipsis: true,
      responsive: ['xl'],
    },
  ];

  const { idClass } = useParams();
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (idClass) {
      setIsLoading(true);
      studentApi
        .getByIdClass(idClass)
        .then(res => {
          setIsLoading(false);
          mappingData(res.data);
        })
        .catch(err => console.log(err.message));
    }
  }, [idClass]);

  const mappingData = data => {
    const res = [];
    data.map(e => {
      res.push({
        idStudent: e.idStudent,
        name: e?.User.displayName,
        email: e?.User.email,
        phoneNumber: e?.User.phoneNumber,
        address: e?.User.address.join(', '),
      });
    });
    setDataSource(res);
    setData(res);
  };

  const handleSearch = value => {
    const tmp = data.filter(item => item.name.toLowerCase().search(value.toLowerCase()) >= 0);
    setDataSource(tmp);
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={8}>
        <Search
          size="large"
          placeholder="Search by name"
          allowClear
          enterButton
          onSearch={handleSearch}
        />
      </Col>
      <Col flex="auto" />
      <Col span={24}>
        <Table
          bordered
          columns={columns}
          rowKey={row => row.idStudent}
          dataSource={dataSource}
          loading={isLoading}
        />
      </Col>
    </Row>
  );
};

export default ClassStudent;
