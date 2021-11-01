import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
// import { validateMessages } from 'constant/validationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createClass, updateClass } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { classState$, courseState$ } from 'redux/selectors';
import styles from './index.module.less';

const { TextArea } = Input;
const { Option } = Select;
const moment = require('moment');

const AddClass = () => {
  const [form] = Form.useForm();
  const [courseList, setCourseList] = useState([]);
  const [classRoom, setClass] = useState();
  const [activity, setActivity] = useState('Add');
  const [isEdit, setIsEdit] = useState(false);
  const { isSuccess, isLoading } = useSelector(classState$);
  const { data: classes } = useSelector(classState$);
  const { idClass } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: courses } = useSelector(courseState$);

  useEffect(() => {
    setCourseList(courses);
  }, [courses]);
  useEffect(() => {
    dispatch(getCourses.getCoursesRequest());
  }, []);
  useEffect(() => {
    if (idClass) {
      setIsEdit(true);
      setActivity('Update');
      let classRoom = classes.find(classRoom => {
        return classRoom.idClass == idClass;
      });
      if (classRoom) {
        setClass(classRoom);
        form.setFieldsValue({
          className: classRoom.className,
          room: classRoom.room,
          startDate: moment(classRoom.startDate),
          endDate: moment(classRoom.endDate),
          course: classRoom.Course.courseName,
        });
      }
    }
  }, [idClass]);

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);
  const handleSubmit = () => {
    const { className, course: courseIndex, startDate, endDate, room } = form.getFieldValue();
    if (startDate >= endDate) {
      notification['error']({
        message: 'Can not add class ',
        description: 'Start Date must be less than End Date',
      });
      return;
    }
    if (className && courseIndex && startDate && endDate && room) {
      let course;
      if (isNaN(courseIndex)) {
        course = classRoom.Course;
      } else {
        course = courses[courseIndex];
      }
      if (!isEdit) {
        dispatch(
          createClass.createClassRequest({
            className: className,
            room: room,
            startDate: startDate,
            endDate: endDate,
            idCourse: course.idCourse,
          })
        );
      } else {
        dispatch(
          updateClass.updateClassRequest({
            idClass: idClass,
            className: className,
            room: room,
            startDate: startDate,
            endDate: endDate,
            idCourse: course.idCourse,
          })
        );
      }

      if (isSuccess) {
        notification['success']({
          message: 'Successfully',
          description: isEdit ? 'Update success.' : 'Add success',
        });
        if (!isLoading) {
          setTimeout(() => {
            isEdit ? history.push('/class/') : '';
          }, 500);
        }
      } else {
        notification['error']({
          message: 'Notification Title',
          description: 'This is the content of the notification.',
        });
      }
      form.resetFields();
    }
  };
  const dateFormat = 'MM/DD/YYYY';
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/class">Class</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/class/add">{activity} class</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3>{activity} class</h3>
      <Card>
        <Form form={form} layout="vertical">
          <Row justify="center" gutter={[20, 20]}>
            <Col xd={24} sm={24} md={10}>
              <Form.Item label="Class name" name="className" rules={[{ required: true }]}>
                <Input placeholder="Class name" maxLength="255" />
              </Form.Item>
              <Form.Item label="Start Date" name="startDate" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
              <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
            </Col>
            <Col xd={24} sm={24} md={10}>
              <Form.Item label="Course" name="course" rules={[{ required: true }]}>
                <Select>
                  {courseList.map((course, index) => (
                    <Option key={index}>{course.courseName}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Room" name="room" rules={[{ required: true }]}>
                <Input placeholder="Room" maxLength="255" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{ width: '100%' }}
                  onClick={handleSubmit}
                  loading={isLoading}
                  type="primary"
                  size="large">
                  {activity}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default AddClass;
