import React, { Component } from 'react';
import padStart from 'lodash/padStart';
import { HOURS_PER_DAY } from './constants';
import styles from './index.module.less';

const Timeline = () => {
  let steps = [];
  for (var i = 0; i < HOURS_PER_DAY; i++) {
    let h = i > 0 ? `${padStart(i, 2, 0)}:00` : i === 0 ? '0:00' : null;
    steps.push(
      <div key={`step-${i}`} className={styles.timelineStep}>
        {h}
      </div>
    );
  }

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        <div className={styles.timelineStepsContainer}>{steps}</div>
      </div>
    </div>
  );
};

export default Timeline;
