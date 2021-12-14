import React from 'react';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import Event from './Event';
import styles from './index.module.less';
import { MINUTES_PER_DAY, TIME_LINE_HEIGHT } from './constants';
import { Row } from 'antd';
import BackgroundTimeline from './BackgroundTimeline';

const customEvents = events => {
  events = sortBy(events, 'start');

  const res = events.map((e, i) => {
    return {
      content: e.content,
      top: (e.start * TIME_LINE_HEIGHT) / 60,
      height: ((e.end - e.start) * TIME_LINE_HEIGHT) / 60,
    };
  });
  return res;
};

const Day = ({ events, dayOfWeek }) => {
  const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <div>
      <div className={styles['dayOfWeek-title']}>{day[dayOfWeek]}</div>
      <BackgroundTimeline>
        {customEvents(events).map((e, i) => {
          return <Event key={`event-${i}`} {...e} />;
        })}
      </BackgroundTimeline>
    </div>
  );
};

export default Day;
