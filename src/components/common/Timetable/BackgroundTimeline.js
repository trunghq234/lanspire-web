import React from 'react';
import styles from './index.module.less';
import { HOURS_PER_DAY } from './constants';

const BackgroundTimeline = ({ children }) => {
  let hours = [];
  for (var i = 0; i <= HOURS_PER_DAY; i++) {
    hours.push(<div key={`hour-${i}`} className={styles.eventsBackgroundHour} />);
  }

  return (
    <div className={styles.eventsBackgroundContainer}>
      <div className={styles.eventsBackground}>{hours}</div>
      {children}
    </div>
  );
};

export default BackgroundTimeline;
