import { Col, Row, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as timeFrameActions from 'redux/actions/timeFrames';
import { classState$, timeFrameState$ } from 'redux/selectors';
const moment = require('moment');
const localizer = momentLocalizer(moment);
const CustomCalendar = () => {
  const dispatch = useDispatch();
  const [timeFrameList, setTimeFrameList] = useState([]);
  const { data: timeFrames, isLoading, isSuccess } = useSelector(timeFrameState$);
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
        const currentDay = moment(day);
        temp.push({
          start: currentDay.add(timeFrame.startingTime).toDate(),
          title: timeFrame.room,
          // + ': ' + timeFrame.startingTime + '-' + timeFrame.endingTime,
          end: day.add(timeFrame.endingTime).toDate(),
        });
      });
    });
    setEvents(temp);
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
  let formats = {
    timeGutterFormat: 'HH:mm',
  };
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    if (value) {
      setSelectedDate(value.toDate());
    }
  };
  return (
    <div>
      <Row gutter={20}>
        <Col span={24}>
          <Row style={{ alignItems: 'center', flexDirection: 'column' }}>
            <DatePicker onChange={onChange} picker="month" />
            <Calendar
              formats={formats}
              events={events}
              startAccessor="start"
              endAccessor="end"
              date={selectedDate}
              localizer={localizer}
              style={{ height: '500px', width: '100%' }}
              onNavigate={date => {
                setSelectedDate(date);
              }}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CustomCalendar;
