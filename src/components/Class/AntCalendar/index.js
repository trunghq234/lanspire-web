import { Badge, Calendar } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as timeFrameActions from 'redux/actions/timeFrames';
import { classState$, timeFrameState$ } from 'redux/selectors';
import styles from './index.module.less';

const AntCalendar = props => {
  const dispatch = useDispatch();
  const [timeFrameList, setTimeFrameList] = useState([]);
  const { data: timeFrames } = useSelector(timeFrameState$);
  const { data: classes } = useSelector(classState$);
  const { idClass } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  let listDay;
  useEffect(() => {
    dispatch(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest());
  }, []);
  useEffect(() => {
    mappingDataSource(classes, timeFrames);
  }, [timeFrames]);
  const mappingDataSource = (classes, timeFrames) => {
    const res = [];
    const classRoom = classes.find(classRoom => classRoom.idClass == idClass);
    if (classRoom) {
      const classTimes = classRoom.ClassTimes;
      classTimes.map(classTime => {
        const timeFrame = timeFrames.find(
          timeFrame => timeFrame.idTimeFrame == classTime.idTimeFrame
        );
        res.push({
          ...timeFrame,
          dayOfWeek: classTime.dayOfWeek,
          room: classRoom.room,
          startClass: classRoom.startDate,
          endClass: classRoom.endDate,
        });
      });
      setTimeFrameList(res);
    }
  };
  useEffect(() => {
    const temp = [];
    timeFrameList.map(timeFrame => {
      setListDay(timeFrame.dayOfWeek, timeFrame.startClass, timeFrame.endClass);
      listDay.map(day => {
        temp.push({
          day: day,
          content:
            timeFrame.room +
            ': ' +
            timeFrame.startingTime.slice(0, -3) +
            '-' +
            timeFrame.endingTime.slice(0, -3),
          type: 'error',
        });
      });
    });
    setEvents(temp);
    console.log(temp);
  }, [timeFrameList]);

  const setListDay = (dayOfWeek, startClass, endClass) => {
    var start = moment(startClass),
      end = moment(endClass),
      day = dayOfWeek + 1;

    listDay = [];
    var current = start.clone();

    while (current.day(day).isSameOrBefore(end)) {
      if (current.isSameOrAfter(start)) {
        listDay.push(current.clone());
      }
      current.add(7, 'd');
    }
  };
  const CalendarCell = ({ date, events }) => {
    const isToday = date.format('DD:MM:YYYY') == moment().format('DD:MM:YYYY');
    return (
      <div className={!isToday ? styles.date : styles['date-today']}>
        <div className={styles['date-title']}>{date.format('D')}</div>
        <div className={styles.events}>
          <div>
            <ul className={styles['list-event']}>
              {events.map(item => (
                <li>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  const cellRenderFunc = date => {
    const d = date.format('D');
    const evs = events.filter(event => event.day.format('DD:MM:YYYY') == date.format('DD:MM:YYYY'));
    return <CalendarCell date={date} events={evs} />;
  };
  return (
    <div>
      <Calendar onSelect={null} dateFullCellRender={cellRenderFunc} />
    </div>
  );
};

export default AntCalendar;
