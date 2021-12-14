import React from 'react';
import { Card, Skeleton } from 'antd';
import styles from './index.module.less';

const StatisticCard = props => {
  return (
    <Card>
      <Skeleton loading={props.loading} paragraph={{ rows: 2 }} title={false}>
        <p className={styles.title}>{props.title}</p>
        <h4 style={{ color: props.color }} className={styles.value}>
          {props.value}
        </h4>
      </Skeleton>
    </Card>
  );
};

export default StatisticCard;
