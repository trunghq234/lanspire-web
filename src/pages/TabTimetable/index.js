import { PrinterOutlined } from '@ant-design/icons';
import { Card, notification, Row, Col, Tooltip, Button, Breadcrumb } from 'antd';
import lecturerApi from 'api/lecturerApi';
import Timetable from 'components/common/Timetable';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getClasses } from 'redux/actions/classes';
import { classState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';
import LecturerTimetableToPrint from './LecturerTimetableToPrint';

const LecturerTimetable = props => {
  const [idLecturer, setIdLecturer] = useState();
  const [lecturer, setLecturer] = useState();
  const [dataSource, setDataSource] = useState([[], [], [], [], [], [], []]);
  const classes = useSelector(classState$);
  const timetableRef = React.createRef();
  const dispatch = useDispatch();

  // get class
  useEffect(() => {
    const tmp = localStorage.getItem('idLecturer');
    setIdLecturer(tmp);
    dispatch(getClasses.getClassesRequest());
  }, []);

  //get lecturer by id
  useEffect(() => {
    if (idLecturer) {
      lecturerApi
        .getLecturerById(idLecturer)
        .then(res => setLecturer(res.data))
        .catch(err =>
          notification.error({
            message: `${err}`,
          })
        );
    }
  }, [idLecturer]);

  //load timetable
  useEffect(() => {
    if (lecturer && classes.data.length > 0) {
      const keyClassesTeaching = lecturer.Classes.reduce((pre, curr) => {
        if (moment(curr.endDate) >= currentDate()) {
          pre.push(curr.idClass);
        }
        return pre;
      }, []);
      const timetable = classes.data.reduce((pre, curr) => {
        if (keyClassesTeaching.includes(curr.idClass)) {
          pre.push(
            ...curr.ClassTimes.map(element => {
              return {
                dayOfWeek: element.dayOfWeek,
                startingTime: element.TimeFrame.startingTime,
                endingTime: element.TimeFrame.endingTime,
                contentEvent: {
                  title: curr.className,
                  room: curr.room,
                  startDate: moment(curr.startDate).format('DD/MM/YY'),
                  endDate: moment(curr.endDate).format('DD/MM/YY'),
                },
              };
            })
          );
        }
        return pre;
      }, []);

      var tmp = [[], [], [], [], [], [], []];
      for (let i = 0; i < timetable.length; ++i) {
        let start = timetable[i].startingTime;
        let end = timetable[i].endingTime;
        start = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
        end = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
        tmp[timetable[i].dayOfWeek].push({
          start,
          end,
          content: timetable[i].contentEvent,
        });
      }
      setDataSource(tmp);
    }
  }, [lecturer, classes.data]);

  const handlePrintTimetable = useReactToPrint({
    content: () => timetableRef.current,
  });

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Timetable</Breadcrumb.Item>
      </Breadcrumb>
      <Col span={5}>
        <h3 className="heading">Timetable</h3>
      </Col>
      <Card>
        <Row gutter={[20, 20]}>
          <Col flex="auto" />
          <Col span={4}>
            <Tooltip title="Print timetable">
              <Button size="large" block type="primary" onClick={handlePrintTimetable}>
                <PrinterOutlined />
                Print
              </Button>
            </Tooltip>
          </Col>
          <Col span={24}>
            <Timetable dataSource={dataSource} />
          </Col>
        </Row>
      </Card>
      <div style={{ display: 'none' }}>
        <LecturerTimetableToPrint idLecturer={idLecturer} ref={timetableRef} />
      </div>
    </>
  );
};

export default LecturerTimetable;
