import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Progress, Row, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { ReactComponent as UserSvg } from 'assets/svg/users.svg';
import { countCertainDays } from 'utils/dateTime';
import styles from './index.module.less';

const ClassCard = ({ classData }) => {
  const days = classData.TimeFrames.map(slot =>
    slot.ClassTime.dayOfWeek === 7 ? 0 : slot.ClassTime.dayOfWeek + 1
  );
  const current = countCertainDays(days, new Date(classData.startDate), Date.now());
  const max = countCertainDays(days, new Date(classData.startDate), new Date(classData.endDate));
  const progress = ((current / max) * 100).toFixed(1);
  return (
    <Card>
      <Row className={styles.container}>
        <Col span={22}>
          <h4>
            <Link to="/">{classData.className}</Link>
          </h4>
        </Col>
        <Col span={2}>
          <Tooltip title="View details">
            <Link to={`/class/details/${classData.idClass}`}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
        </Col>
        <Col span={24}>
          <p>{classData.Course.courseName}</p>
        </Col>
        <Col span={24} className={styles.students}>
          <UserSvg />
          <Tooltip title="Number of students">
            <p>{`${classData.Students.length}/${classData.Course.max}`}</p>
          </Tooltip>
        </Col>
        <Col span={24}>
          <Tooltip title="Class progress">
            <Progress percent={isNaN(progress) ? 0 : progress} />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};

export default ClassCard;
