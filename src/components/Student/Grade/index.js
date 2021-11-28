import { PrinterOutlined } from '@ant-design/icons';
import { Button, Col, notification, Row, Table, Select, Card } from 'antd';
import studentApi from 'api/studentApi';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getColumnTranscripts } from 'redux/actions/columnTranscripts';
import { columnTranscriptState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';
import styles from './index.module.less';
const { Option } = Select;

const Grade = () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState();
  const [dataFiler, setDataFilter] = useState();
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
          title: element.columnName + ` (${element.min} - ${element.max})`,
          dataIndex: element.idColumn,
          key: `${element.idColumn}`,
          align: 'center',
          sorter: (a, b) => a - b,
        };
      });
      tmp.unshift({
        title: 'Class name',
        dataIndex: 'className',
        key: 'className',
      });
      setColumns(tmp);
    }
  }, [columnTranscripts.data]);

  //load data
  useEffect(() => {
    if (student) {
      const currentClass = student.Classes.reduce((pre, curr) => {
        if (moment(curr.endDate) >= currentDate()) {
          pre.push({ className: curr.className, status: 'in_progress' });
        } else {
          pre.push({ className: curr.className, status: 'done' });
        }
        return pre;
      }, []);
      const data = student.Exams.reduce(
        (pre, curr) => {
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
              status: moment(curr.endDate) < currentDate() ? 'done' : 'in_progress',
            });
          }
          return pre;
        },
        [...currentClass]
      );

      setDataSource(data);
      setDataFilter(data);
    }
  }, [student]);

  const handleFilter = value => {
    if (value === 'all') {
      setDataFilter(dataSource);
    } else {
      const tmp = dataSource.filter(element => element.status === value);
      setDataFilter(tmp);
    }
  };
  return (
    <Card>
      <Row>
        <Col span={4}>
          <Select
            defaultValue="all"
            onSelect={handleFilter}
            placeholder="Select status class"
            style={{ width: '100%', margin: '10px 0' }}>
            <Option value="all">All classes</Option>
            <Option value="in_progress">In progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </Col>
        <Col span={2} offset={18}>
          <Button block className={styles.print}>
            <PrinterOutlined />
            Print
          </Button>
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={dataFiler} bordered loading={!student} />
        </Col>
      </Row>
    </Card>
  );
};

export default Grade;
