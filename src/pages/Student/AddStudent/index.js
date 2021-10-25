import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PersonalInfo from 'components/Lecturer/PersonalInfo';
import { Button, Row, Col } from 'antd';
import style from './index.module.less';
const AddStudent = () => {
  return (
    <div>
      <Row gutter={10} justify="end" className={style.actions}>
        <Col>
          <Button className={style['btn-discard']} size="large">
            Discard
          </Button>
        </Col>
        <Col>
          <Button className={style['btn-add']} size="large">
            Add
          </Button>
        </Col>
      </Row>
      <PersonalInfo></PersonalInfo>
    </div>
  );
};
export default AddStudent;
