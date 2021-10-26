import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import Uploader from 'components/common/Uploader';
import React from 'react';
import { Link } from 'react-router-dom';
import CourseInfo from '../CourseInfo';
import LevelInfo from '../LevelInfo';
import styles from './index.module.less';

const AddCourse = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/course">Course</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/course/add">Add course</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 20]}>
        <Col>
          <h3>Add new course</h3>
        </Col>
        <Col flex="auto" />
        <Col span={4}>
          <Button className={styles.btn} size="large" type="primary">
            Add course
          </Button>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={20} md={18} lg={18} xl={18}>
              <CourseInfo />
            </Col>
            <Col xs={24} sm={4} md={6} lg={6} xl={6}>
              <Uploader />
            </Col>
            <Col xs={24} sm={20} md={18} lg={18} xl={18}>
              <LevelInfo />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AddCourse;
