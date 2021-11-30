import { Row, Col, Table, Button, Card, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getStudents } from 'redux/actions/students';
import { studentState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';

const TabArrangeClass = () => {
  const columns = [
    {
      title: 'No1.',
      key: 'no1',
      align: 'center',
      width: '100px',
      render: (record, value, index) => <span>{(currentPage - 1) * pageSize + index + 1}</span>,
    },
    {
      title: 'Class name',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      filters: [
        {
          text: 'Done',
          value: 0,
        },
        {
          text: 'In progress',
          value: 1,
        },
        {
          text: 'Enrolled',
          value: 2,
        },
      ],
      render: (status, index) => {
        const color = status === 0 ? 'gray' : status === 1 ? 'blue' : 'orange';
        return (
          <Tag color={color} key={index}>
            {status === 0 ? 'Done' : status === 1 ? 'In progress' : 'Enrolled'}
          </Tag>
        );
      },
      onFilter: (value, record) => record.status === value,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();
  const students = useSelector(studentState$);
  const { idStudent } = useParams();
  const history = useHistory();
  useEffect(() => dispatch(getStudents.getStudentsRequest()), [dispatch]);

  useEffect(() => {
    if (students.data.length !== 0) {
      const student = students.data.find(element => element.idStudent === idStudent);
      const classes = student.Classes;

      const tmp = classes.map(element => {
        return {
          className: element.className,
          startDate: moment(element.startDate).format('DD/MM/YYYY'),
          endDate: moment(element.endDate).format('DD/MM/YYYY'),
          status:
            moment(element.endDate) < Date.now()
              ? 0
              : moment(element.startDate) > currentDate()
              ? 2
              : 1,
        };
      });
      setDataSource(tmp);
    }
  }, [students.data]);
  const handleClickArrangeClass = () => {
    history.push(`/student/details/arrange-class/${idStudent}`);
  };
  return (
    <Col span={24}>
      <Card>
        <Row>
          <Col span={5}>
            <h3>Class list</h3>
          </Col>
          <Col span={4} offset={15}>
            <Button type="primary" block onClick={handleClickArrangeClass}>
              Arrange New Class
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              bordered
              loading={students.isLoading}
              pagination={{
                showSizeChanger: true,
                current: currentPage,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
              }}
              columns={columns}
              dataSource={dataSource}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default TabArrangeClass;
