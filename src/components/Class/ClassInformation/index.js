import { Col, Row, Spin } from 'antd';
import React from 'react';
import { formatDate } from 'utils/dateTime';
import styles from './index.module.less';

const DescriptionItem = ({ title, content }) => (
  <Row>
    <Col span={6} className={styles.description}>
      <p style={{ fontWeight: 600 }}>{title}</p>
    </Col>
    <Col>
      <p>{content}</p>
    </Col>
  </Row>
);

const mapWeekday = order => {
  switch (order) {
    case 0:
      return 'Mon';
    case 1:
      return 'Tue';
    case 2:
      return 'Wed';
    case 3:
      return 'Thur';
    case 4:
      return 'Fri';
    case 5:
      return 'Sat';
    case 6:
      return 'Sun';
    default:
      return 'Sun';
  }
};
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ClassInformation = ({ classData, course }) => {
  return (
    <Spin tips="Loading.." spinning={!course}>
      <Row>
        <Col span={12}>
          <h3 className={styles.heading}>Class information</h3>
          <DescriptionItem title="Class name:" content={classData?.className} />
          <DescriptionItem title="Room:" content={classData?.room} />
          <DescriptionItem title="Start date:" content={formatDate(classData?.startDate)} />
          <DescriptionItem title="End date:" content={formatDate(classData?.endDate)} />
          <Row>
            <Col span={6} className={styles.description}>
              <p className={styles.title}>Class times:</p>
            </Col>
            <Col>
              {classData?.ClassTimes.map(time => (
                <p className={styles.content} key={time.idClassTime}>
                  {`${time.TimeFrame.startingTime} - ${time.TimeFrame.endingTime} | ${
                    weekDays[time.dayOfWeek]
                  }`}
                </p>
              ))}
            </Col>
          </Row>
          <h3 className={styles.heading}>Class details</h3>
          <DescriptionItem title="Students:" content={`${classData?.Students.length} (students)`} />
          <Row>
            <Col span={6} className={styles.description}>
              <p className={styles.title}>Lecturers:</p>
            </Col>
            <Col>
              {classData?.Lecturers.map(lecturer => (
                <p className={styles.content} key={lecturer.idLecturer}>
                  {lecturer?.User.displayName}
                </p>
              ))}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <h3 className={styles.heading}>Course information</h3>
          <DescriptionItem title="Course name:" content={course?.courseName} />
          <DescriptionItem title="Fee:" content={parseInt(course?.fee).toLocaleString()} />
          <DescriptionItem title="Max students:" content={parseInt(course?.max).toLocaleString()} />
          <DescriptionItem title="Description:" content={course?.description} />
          <h3 className={styles.heading}>Course type</h3>
          {course?.CourseType && (
            <>
              <DescriptionItem title="Type name:" content={course?.CourseType.typeName} />
              <DescriptionItem title="Description:" content={course?.CourseType.description} />
            </>
          )}
          <h3 className={styles.heading}>Level</h3>
          {course?.Level && (
            <>
              <DescriptionItem title="Level name:" content={course?.Level.levelName} />
              <DescriptionItem title="Point:" content={course?.Level.point} />
              <DescriptionItem title="Language:" content={course?.Level.language} />
            </>
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default ClassInformation;
