import { Col, notification, Row, Table } from 'antd';
import studentApi from 'api/studentApi';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getColumnTranscripts } from 'redux/actions/columnTranscripts';
import { columnTranscriptState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';

const Grade = () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState();
  const [student, setStudent] = useState();
  const columnTranscripts = useSelector(columnTranscriptState$);
  const { idStudent } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColumnTranscripts.getColumnTranscriptsRequest());
  }, []);

  //get exam
  useEffect(async () => {
    try {
      const res = await studentApi.getById(idStudent);
      setStudent(res.data);
    } catch (err) {
      notification.error({
        message: `${err}`,
      });
    }
  }, []);
  //init column
  useEffect(() => {
    if (columnTranscripts.data.length > 0) {
      const tmp = columnTranscripts.data.map(element => {
        return {
          title: element.columnName,
          dataIndex: element.idColumn,
          key: `${element.idColumn}`,
          align: 'center',
        };
      });
      tmp.unshift({
        title: 'Class name',
        dataIndex: 'className',
        key: 'className',
        filters: [
          {
            text: 'Studying',
            value: 1,
          },
          {
            text: 'Studied',
            value: 0,
          },
        ],

        onFilter: (value, record) => record.status === value,
      });
      setColumns(tmp);
    }
  }, [columnTranscripts.data]);

  //load data
  useEffect(() => {
    if (student) {
      const currentClass = student.Classes.reduce((pre, curr) => {
        if (moment(curr.endDate) >= currentDate()) {
          pre.push({ className: curr.className, status: 1 });
        }
        return pre;
      }, []);
      const data = student.Exams.reduce(
        (pre, curr) => {
          console.log(pre);
          const tmp = pre.findIndex(element => element.className === curr.Class.className);
          if (tmp >= 0) {
            pre[tmp] = {
              ...pre[tmp],
              [curr.idColumn]: curr.Testing.score,
            };
          } else {
            pre.push({
              className: curr.Class.className,
              [curr.idColumn]: curr.Testing.score,
              status: moment(curr.endDate) < currentDate() ? 0 : 1,
            });
          }
          // console.log(pre);
          return pre;
        },
        [...currentClass]
      );

      setDataSource(data);
    }
  }, [student]);

  return (
    <Row>
      <Col span={24}>
        <Table columns={columns} dataSource={dataSource} bordered />
      </Col>
    </Row>
  );
};

export default Grade;
