import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const DescriptionItem = ({ title, content }) => (
  <Row>
    <Col span={3}>
      <p style={{ fontWeight: 600 }}>{title}</p>
    </Col>
    <Col>
      <p>{content}</p>
    </Col>
  </Row>
);

const CourseInfo = ({ course }) => {
  const role = localStorage.getItem('role');
  return (
    <Card>
      <Row>
        <Col span={22}>
          <h3>Information</h3>
          <DescriptionItem title="Course name:" content={course.courseName} />
          <DescriptionItem title="Fee:" content={parseInt(course.fee).toLocaleString()} />
          <DescriptionItem title="Max students:" content={parseInt(course.max).toLocaleString()} />
          <DescriptionItem title="Description:" content={course.description} />
          <h3>Course type</h3>
          {course.CourseType && (
            <>
              <DescriptionItem title="Type name:" content={course.CourseType.typeName} />
              <DescriptionItem title="Description:" content={course.CourseType.description} />
            </>
          )}
          <h3>Level</h3>
          {course.Level && (
            <>
              <DescriptionItem title="Level name:" content={course.Level.levelName} />
              <DescriptionItem title="Point:" content={course.Level.point} />
              <DescriptionItem title="Language:" content={course.Level.language} />
            </>
          )}
        </Col>
        <Col flex="auto" />
        {role === 'admin' && (
          <Col>
            <Tooltip title="Edit">
              <Link to={`/course/edit/${course.idCourse}`}>
                <Button type="primary" ghost icon={<EditOutlined />} />
              </Link>
            </Tooltip>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default CourseInfo;
