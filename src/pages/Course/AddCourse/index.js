import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
} from 'antd';
import { validateMessages } from 'constant/validationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { courseState$, courseTypeState$, levelState$ } from 'redux/selectors';
import { getCourseTypes } from 'redux/actions/courseTypes';
import { getLevels } from 'redux/actions/levels';
import { createCourse } from 'redux/actions/courses';
import styles from './index.module.less';

const { TextArea } = Input;
const { Option } = Select;

const AddCourse = () => {
  const [form] = Form.useForm();
  const [pointList, setPointList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [levelList, setLevelList] = useState([]);

  const { idCourse } = useParams();
  useEffect(() => {
    console.log(idCourse);
  }, [idCourse]);
  const dispatch = useDispatch();
  const { data: courseTypeList } = useSelector(courseTypeState$);
  const { data: levels } = useSelector(levelState$);
  const { isSuccess, isLoading } = useSelector(courseState$);

  useEffect(() => {
    dispatch(getCourseTypes.getCourseTypesRequest());
    dispatch(getLevels.getLevelsRequest());
  }, []);

  useEffect(() => {
    const tmp = levels.map(level => level.levelName);
    const res = [...new Set(tmp)];
    setLevelList(res);
  }, [levels]);

  const handleSelectLevel = e => {
    const selected = levelList[e];
    const res = levels.filter(level => level.levelName == selected);
    setPointList(res);
    setIsSelected(true);
  };

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);
  const handleSubmit = () => {
    const {
      courseName,
      fee,
      description,
      point: pointIndex,
      typeName: typeIndex,
    } = form.getFieldValue();
    if (courseName && fee && description && pointIndex && typeIndex) {
      const level = pointList[pointIndex];
      const courseType = courseTypeList[typeIndex];

      dispatch(
        createCourse.createCourseRequest({
          courseName: courseName,
          fee: fee,
          description: description,
          idLevel: level.idLevel,
          idCourseType: courseType.idCourseType,
          Level: level,
          CourseType: courseType,
        })
      );

      isSuccess
        ? notification['success']({
            message: 'Successfully',
            description: 'This is the content of the notification.',
          })
        : notification['error']({
            message: 'Notification Title',
            description: 'This is the content of the notification.',
          });
      form.resetFields();
    }
  };

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
      <h3>Add new course</h3>
      <Card>
        <Form form={form} layout="vertical" validateMessages={validateMessages}>
          <Row justify="center" gutter={[40, 20]}>
            <Col span={8}>
              <Form.Item label="Course name" name="courseName" rules={[{ required: true }]}>
                <Input placeholder="Course name" maxLength="255" />
              </Form.Item>
              <Form.Item label="Fee" name="fee" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: '50%' }}
                  min={0}
                  maxLength={18}
                  placeholder="Course fee"
                  formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea
                  allowClear
                  maxLength="255"
                  placeholder="Description about the course type"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Level name" name="levelName" rules={[{ required: true }]}>
                <Select onChange={e => handleSelectLevel(e)}>
                  {levelList.map((level, index) => (
                    <Option key={index}>{level}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Point" name="point" rules={[{ required: true }]}>
                <Select disabled={!isSelected}>
                  {pointList.map((level, index) => (
                    <Option key={index}>{level.point}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Coure type name" name="typeName" rules={[{ required: true }]}>
                <Select>
                  {courseTypeList.map((level, index) => (
                    <Option key={index}>{level.typeName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={isLoading}
                  style={{ width: '100%' }}
                  onClick={handleSubmit}
                  type="primary"
                  size="large">
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default AddCourse;
