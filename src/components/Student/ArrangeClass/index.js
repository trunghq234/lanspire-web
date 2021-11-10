import { Row, Col, Table, Button, Card } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getClasses } from 'redux/actions/classes';
import { classState$ } from 'redux/selectors';

const ArrangeClass = () => {
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
  ];
  const data = [
    {
      className: 'ádasd',
      startDate: 'ádad',
      endDate: 'ádad',
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const dispatch = useDispatch();
  const classes = useSelector(classState$);

  useEffect(() => dispatch(getClasses.getClassesRequest()), [dispatch]);

  useEffect(() => {
    if (classes.data.length !== 0) {
      const Learnings = classes.data.map(element => element.Learnings);
      console.log(Learnings);
    }
  }, [classes.data]);
  const handleArrangeClass = () => {};

  return (
    <Col span={24}>
      <Card>
        <Row>
          <Col span={5}>
            <h3>Current class</h3>
          </Col>
          <Col span={4} offset={15}>
            <Button type="primary" block onClick={handleArrangeClass}>
              Arrange New Class
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              bordered
              pagination={{
                showSizeChanger: true,
                current: currentPage,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
              }}
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ArrangeClass;
