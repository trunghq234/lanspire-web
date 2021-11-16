import { Card, Tooltip } from 'antd';
import React from 'react';
import { TIME_LINE_HEIGHT } from './constants';
import styles from './index.module.less';

const Event = ({ height, top, content }) => {
  let s = {
    height: `calc(${height}px - 2px)`,
    top: `calc(${top}px + ${TIME_LINE_HEIGHT}px)`,
  };

  return (
    <div className={styles.eventContainer} style={s}>
      <div className={styles.event}>
        <Tooltip title={content.title}>
          <div className={styles['event-title']}>{content.title}</div>
        </Tooltip>
        <div className={styles['event-room']}>{content.room}</div>
        <div className={styles['event-date']}>
          {content.startDate} - {content.endDate}
        </div>
      </div>
    </div>
  );
};

export default Event;
