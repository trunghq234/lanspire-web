import { Badge, Button, Calendar, Col, Modal, Row } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as timeFrameActions from 'redux/actions/timeFrames';
import { timeFrameState$ } from 'redux/selectors';
import styles from './index.module.less';

const AntCalendar = ({ classData }) => {
  const dispatch = useDispatch();
  const [timeFrameList, setTimeFrameList] = useState([]);
  const { data: timeFrames } = useSelector(timeFrameState$);
  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  let listDay;
  const colors = ['pink', 'red', 'cyan', 'green', 'blue', 'purple', 'gold', 'lime'];
  let currentMode = 'date';
  useEffect(() => {
    dispatch(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest());
  }, []);
  useEffect(() => {
    if (timeFrames.length != 0 && classData) {
      mappingDataSource(timeFrames);
    }
  }, [timeFrames, classData]);
  const mappingDataSource = timeFrames => {
    const res = [];
    if (classData) {
      classData.ClassTimes.map(classTime => {
        const timeFrame = timeFrames.find(
          timeFrame => timeFrame.idTimeFrame == classTime.idTimeFrame
        );
        res.push({
          ...timeFrame,
          dayOfWeek: classTime.dayOfWeek,
          room: classData.room,
          startClass: classData.startDate,
          endClass: classData.endDate,
        });
      });
      setTimeFrameList(res);
    }
  };
  useEffect(() => {
    const temp = [];
    if (timeFrameList) {
      timeFrameList.map((timeFrame, index) => {
        setListDay(timeFrame.dayOfWeek, timeFrame.startClass, timeFrame.endClass);
        listDay.map(day => {
          const color = colors[index % colors.length];
          temp.push({
            day: day,
            content:
              timeFrame.room +
              ': ' +
              timeFrame.startingTime.slice(0, -3) +
              '-' +
              timeFrame.endingTime.slice(0, -3),
            color: color,
          });
        });
      });
      setEvents(temp);
    }
  }, [timeFrameList]);

  const setListDay = (dayOfWeek, startClass, endClass) => {
    var start = moment(startClass),
      end = moment(endClass),
      day = dayOfWeek != 6 ? dayOfWeek + 1 : 0;

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
                  <Badge color={item.color} text={item.content} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  const cellRenderFunc = date => {
    const evs = events.filter(event => event.day.format('DD:MM:YYYY') == date.format('DD:MM:YYYY'));
    return <CalendarCell date={date} events={evs} />;
  };
  const showDrawer = value => {
    if (currentMode == 'date') {
      const evs = events.filter(
        event => event.day.format('DD:MM:YYYY') == value.format('DD:MM:YYYY')
      );
      setCurrentEvents(evs);
      setVisible(true);
    }
    currentMode = 'date';
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onPanelChange = (value, mode) => {
    currentMode = mode;
  };
  return (
    <div>
      <Calendar
        onPanelChange={onPanelChange}
        onSelect={showDrawer}
        dateFullCellRender={cellRenderFunc}
      />
      <Modal
        title={classData?.className}
        placement="right"
        centered
        onCancel={handleCancel}
        visible={visible}
        footer={[
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        centered>
        <Row>
          <Col span={12}>
            <ul className={styles['list-event']}>
              {currentEvents.map((item, index) => (
                <li key={index}>
                  <Badge color={item.color} text={item.content} />
                </li>
              ))}
            </ul>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AntCalendar;
