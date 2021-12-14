import { Col, Row } from 'antd';
import React from 'react';
import Day from './Day';
import styles from './index.module.less';
import Timeline from './Timeline';

const Timetable = props => {
  const { dataSource } = props;
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
