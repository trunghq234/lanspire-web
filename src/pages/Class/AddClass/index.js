import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createClass, updateClass } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import * as timeFrameActions from 'redux/actions/timeFrames';
import { classState$, courseState$, timeFrameState$ } from 'redux/selectors';
import styles from './index.module.less';
import { getClasses } from 'redux/actions/classes';

const { TextArea } = Input;
const { Option } = Select;
const moment = require('moment');

const AddClass = () => {
  const [form] = Form.useForm();
  const [courseList, setCourseList] = useState([]);
  const [timeFrameList, setTimeFrameList] = useState([]);
  const [classRoom, setClass] = useState();
  const [activity, setActivity] = useState('Add');
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInProcess, setIsInProcess] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { isSuccess, isLoading } = useSelector(classState$);
  const { data: classes } = useSelector(classState$);
  const { idClass } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: courses } = useSelector(courseState$);
  const { data: timeFrames } = useSelector(timeFrameState$);
  const format = 'DD:MM:yy';

  useEffect(() => {
    setCourseList(courses);
  }, [courses]);
  useEffect(() => {
    const activateTimeFrames = timeFrames.filter(timeFrame => timeFrame.activate == true);
    setTimeFrameList(activateTimeFrames);
  }, [timeFrames]);
  useEffect(() => {
    dispatch(getCourses.getCoursesRequest());
    dispatch(getClasses.getClassesRequest());
    dispatch(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest());
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
        if (moment(classRoom.startDate).isSameOrBefore(moment())) {
          setIsInProcess(true);
        }
        if (moment(classRoom.endDate).isBefore(moment(), 'date')) {
          setIsFinished(true);
        }
        const classTimes = classRoom.ClassTimes;
        form.setFieldsValue({
          className: classRoom.className,
          room: classRoom.room,
          startDate: moment(classRoom.startDate),
          endDate: moment(classRoom.endDate),
          course: classRoom.Course.courseName,
        });
        if (timeFrames) {
          const updateTimeFrames = classTimes.map(classTime => {
            return {
              ...classTime,
              dayOfWeek: dayOfWeeks[parseInt(classTime.dayOfWeek)].value,
            };
          });
          form.setFieldsValue({
            timeFrames: updateTimeFrames,
          });
        }
      }
    }
  }, [idClass, classes]);

  useEffect(() => {
    if (isSubmit) {
      if (!isLoading) {
        if (isSuccess) {
          notification['success']({
            message: 'Successfully',
            description: isEdit ? 'Update success.' : 'Add success',
          });
          setTimeout(() => {
            isEdit ? history.push('/class') : '';
          }, 500);
          form.resetFields();
        } else {
          notification['error']({
            message: 'Error',
            description: 'This is the content of the notification.',
          });
        }
      }
    }
  }, [isSuccess]);
  const checkDuplicateRoom = (classTimes, room) => {
    let isDuplicate = false;
    let classDuplicate = '';
    classes.map(classRoom => {
      let temps = [];

      classRoom.ClassTimes.map(currentClassTime => {
        let isExistTimeFrame = timeFrames.filter(
          timeFrame => timeFrame.idTimeFrame == currentClassTime.idTimeFrame
        );

        if (isExistTimeFrame) {
          isExistTimeFrame = isExistTimeFrame.map(temp => {
            return { ...temp, dayOfWeek: currentClassTime.dayOfWeek };
          });
          temps.push(...isExistTimeFrame);
        }
      });

      classTimes.map(classTime => {
        if (classRoom.room == room && classRoom.idClass != idClass) {
          let timeFrame = timeFrames.find(
            timeFrame => timeFrame.idTimeFrame == classTime.idTimeFrame
          );
          temps.map(temp => {
            if (
              !(
                timeFrame.startingTime >= temp.endingTime ||
                timeFrame.endingTime <= temp.startingTime
              ) &&
              temp.dayOfWeek == classTime.dayOfWeek
            ) {
              isDuplicate = true;
              classDuplicate = classRoom.className;
              return;
            }
          });
        }
      });
    });
    return { isDuplicate, classDuplicate };
  };
  const CheckIsExist = classTimes => {
    return classTimes
      .map(classTime => {
        return classTime.dayOfWeek + classTime.idTimeFrame;
      })
      .some((classTime, index, classTimes) => {
        return classTimes.indexOf(classTime) !== classTimes.lastIndexOf(classTime);
      });
  };
  const handleSubmit = () => {
    setIsSubmit(true);
    const {
      className,
      course: courseIndex,
      startDate,
      endDate,
      room,
      timeFrames,
    } = form.getFieldValue();
    let data;
    if (timeFrames && timeFrames.length > 0) {
      const isValid = timeFrames.filter(
        timeFrame => timeFrame == undefined || !timeFrame.idTimeFrame || !timeFrame.dayOfWeek
      );
      if (isValid.length > 0) {
        return;
      } else {
        const updateTimeFrames = timeFrames.map(timeFrame => {
          if (isNaN(timeFrame.dayOfWeek)) {
            return {
              idTimeFrame: timeFrame.idTimeFrame,
              dayOfWeek: dayOfWeeks.find(day => day.value == timeFrame.dayOfWeek).id,
            };
          } else {
            return timeFrame;
          }
        });
        data = updateTimeFrames;
      }
    } else {
      notification.error({
        message: 'Can not add class ',
        description: 'Class must have at least one time frame',
      });
      return;
    }
    if (startDate >= endDate) {
      notification.error({
        message: 'Can not add class ',
        description: 'Start Date must be less than End Date',
      });
      return;
    }
    if (moment(startDate).isBefore(moment(), 'date') && !isEdit) {
      notification.error({
        message: 'Can not add class',
        description: 'Start Date must be greater than Today',
      });
      return;
    }
    if (CheckIsExist(data)) {
      notification.error({
        message: 'Can not add class ',
        description: `Time Frame is duplicate`,
      });
      return;
    }
    const { isDuplicate, classDuplicate } = checkDuplicateRoom(data, room);
    if (isDuplicate) {
      notification.error({
        message: 'Can not add class ',
        description: `This room has duplicate time in class '` + classDuplicate + `'`,
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
            timeFrames: data,
          })
        );
      } else {
        dispatch(
          updateClass.updateClassRequest({
            ...classRoom,
            idClass: idClass,
            className: className,
            room: room,
            startDate: startDate,
            endDate: endDate,
            idCourse: course.idCourse,
            timeFrames: data,
          })
        );
      }
    }
  };
  const dayOfWeeks = [
    {
      id: '0',
      value: 'Monday',
    },
    {
      id: '1',
      value: 'Tuesday',
    },
    {
      id: '2',
      value: 'Wednesday',
    },
    {
      id: '3',
      value: 'Thursday',
    },
    {
      id: '4',
      value: 'Friday',
    },
    {
      id: '5',
      value: 'Saturday',
    },
    {
      id: '6',
      value: 'Sunday',
    },
  ];
  const dateFormat = 'DD/MM/YYYY';
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
                <DatePicker
                  disabled={isInProcess}
                  format={dateFormat}
                  className={styles.maxwidth}
                />
              </Form.Item>
              <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
                <DatePicker disabled={isFinished} format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
              <Form.Item label="Course" name="course" rules={[{ required: true }]}>
                <Select disabled={isInProcess}>
                  {courseList.map((course, index) => (
                    <Option key={index}>{course.courseName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xd={24} sm={24} md={10}>
              <Form.Item label="Room" name="room" rules={[{ required: true }]}>
                <Input placeholder="Room" maxLength="255" />
              </Form.Item>
              <Form.Item
                label="Time Frames"
                name="checktimeFrames"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (getFieldValue('timeFrames') && getFieldValue('timeFrames').length) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Please add Time Frame');
                    },
                  }),
                ]}>
                <Form.List name="timeFrames" label="Time Frames">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Row
                          key={key}
                          gutter={10}
                          style={{ display: 'flex', width: '100%', alignItems: 'baseline' }}>
                          <Col span={16}>
                            <Form.Item
                              {...restField}
                              name={[name, 'idTimeFrame']}
                              fieldKey={[fieldKey, 'idTimeFrame']}
                              rules={[{ required: true, message: 'Please choose time frame.' }]}
                              style={{ marginBottom: '8px' }}>
                              <Select disabled={isInProcess}>
                                {timeFrameList.map((timeFrame, index) => (
                                  <Option key={timeFrame.idTimeFrame}>
                                    <Row
                                      style={{
                                        display: 'flex',
                                        width: '100%',
                                        textAlign: 'center',
                                      }}>
                                      <Col span={10}>{timeFrame.startingTime.slice(0, -3)}</Col>
                                      <Col span={4}>-</Col>
                                      <Col span={10}>{timeFrame.endingTime.slice(0, -3)}</Col>
                                    </Row>
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={7}>
                            <Form.Item
                              {...restField}
                              name={[name, 'dayOfWeek']}
                              fieldKey={[fieldKey, 'dayOfWeek']}
                              rules={[{ required: true, message: 'Please choose Day Of Week.' }]}
                              style={{ marginBottom: '8px' }}>
                              <Select disabled={isInProcess}>
                                {dayOfWeeks.map((day, index) => (
                                  <Option key={day.id}>{day.value}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={1}>
                            <Tooltip title="Remove time slot">
                              <Button type="link" danger disabled={isInProcess}>
                                <MinusCircleOutlined
                                  onClick={() => {
                                    remove(name);
                                  }}
                                />
                              </Button>
                            </Tooltip>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <Button type="link" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add time frame
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
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
