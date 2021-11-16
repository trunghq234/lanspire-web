import React, { useState, useEffect } from 'react';
import Day from './Day';
import Timeline from './Timeline';
import { Col, notification, Row } from 'antd';
import studentApi from 'api/studentApi';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getClasses } from 'redux/actions/classes';
import { classState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';
import styles from './index.module.less';

const Timetable = () => {
  const { idStudent } = useParams();
  const [student, setStudent] = useState();
  const [dataSource, setDataSource] = useState([[], [], [], [], [], [], []]);
  const classes = useSelector(classState$);
  const dispatch = useDispatch();

  //get student by id
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

  // get class
  useEffect(() => {
    dispatch(getClasses.getClassesRequest());
  }, []);

  //load timetable
  useEffect(() => {
    if (student && classes.data.length > 0) {
      const keyClassesStudying = student.Classes.reduce((pre, curr) => {
        if (
          (moment(curr.startDate) < currentDate() && moment(curr.endDate) > currentDate()) ||
          moment(curr.endDate).format('DD/MM/YYYY') === currentDate().format('DD/MM/YYYY') ||
          moment(curr.startDate).format('DD/MM/YYYY') === currentDate().format('DD/MM/YYYY')
        ) {
          pre.push(curr.idClass);
        }
        return pre;
      }, []);
      const timetable = classes.data.reduce((pre, curr) => {
        if (keyClassesStudying.includes(curr.idClass)) {
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
  }, [student, classes.data]);

  return (
    <Row gutter={5} style={{ backgroundColor: 'white' }}>
      <Col span={3}>
        <Timeline />
      </Col>
      {dataSource.map((day, i) => {
        return (
          <Col key={`day-${i}`} span={3} className={styles.dayOfWeek}>
            <Day events={day} dayOfWeek={i} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Timetable;
