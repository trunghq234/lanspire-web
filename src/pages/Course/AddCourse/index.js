import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Steps, Button, Result, Form, Card, message } from 'antd';
import { useStepsForm } from 'sunflower-antd';
import styles from './index.module.less';
import AddCourseInfo from 'components/Course/AddCourseInfo';
import ColumnInput from 'components/Course/ColumnInput';
import { useDispatch, useSelector } from 'react-redux';
import { courseState$ } from 'redux/selectors';
import { createCourse, getCourses, updateCourse } from 'redux/actions/courses';
import { validateMessages } from 'constant/validationMessage';

const { Step } = Steps;

const AddCourse = () => {
  const [isDone, setIsDone] = useState(false);
  const dispatch = useDispatch();
  const { data: courseList, isSuccess: isDispatchSuccess, isLoading } = useSelector(courseState$);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [columnKeys, setColumnKeys] = useState([]);
  const [course, setCourse] = useState({});
  const [editCourse, setEditCourse] = useState();

  const { idCourse } = useParams();
  useEffect(() => {
    if (idCourse) {
      setIsEdit(true);
      dispatch(getCourses.getCoursesRequest());
      const tmp = courseList.find(course => course.idCourse === idCourse);
      setEditCourse(tmp);
    }
  }, [idCourse]);

  const { form, current, gotoStep, stepsProps, formProps, submit, formLoading } = useStepsForm({
    total: 3,
    defaultCurrent: 0,
    isBackValidate: false,
    submit(values) {
      if (columnKeys.length > 0) {
        if (isEdit) {
          const tmp = { idCourse: idCourse, ...course, columns: columnKeys };
          dispatch(updateCourse.updateCourseRequest(tmp));
        } else {
          const tmp = { ...course, columns: columnKeys };
          dispatch(createCourse.createCourseRequest(tmp));
        }
        setIsSuccess(isDispatchSuccess);
        setIsDone(true);
        gotoStep(current + 1);
      } else {
        message.warning('Number of column must higher than 0');
        setIsDone(false);
      }
    },
  });
  const goNext = () => {
    setIsBack(false);
    gotoStep(current + 1);
  };
  const goPrev = () => {
    setIsBack(true);
    gotoStep(current - 1);
  };
  const handleSubmit = () => {
    submit();
  };
  useEffect(() => {
    if (!isDispatchSuccess && !isLoading) {
      setIsSuccess(false);
    }
  }, [isDispatchSuccess, isLoading]);
  const handleSubmitCourse = value => {
    setCourse(value);
  };
  const handleAddNew = () => {
    form.resetFields();
    gotoStep(0);
    setIsDone(false);
  };
  const formList = [
    <AddCourseInfo
      form={form}
      handleSubmitCourse={handleSubmitCourse}
      goNext={goNext}
      editCourse={editCourse}
      isBack={isBack}
    />,
    <ColumnInput
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      goPrev={goPrev}
      changeColNum={e => setColumnKeys(e)}
      editCourse={editCourse}
    />,
  ];
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/course">Course</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{isEdit ? 'Update course' : 'Add new course'}</Breadcrumb.Item>
      </Breadcrumb>
      <h3>{isEdit ? 'Update course' : 'Add new course'}</h3>
      <Steps {...stepsProps} className={styles.steps} type="navigation" responsive>
        <Step title="Course information" disabled={isDone} />
        <Step title="Point structure" disabled={isDone} />
        <Step title="Result" disabled={!isDone} />
      </Steps>
      <div className={styles['steps-content']}>
        {current !== 2 && (
          <Form {...formProps} layout="vertical" validateMessages={validateMessages}>
            <Card>{formList[current]}</Card>
          </Form>
        )}
        {current === 2 && isDone && isSuccess && (
          <Card>
            <Result
              status="success"
              title={isEdit ? 'Updated course successfully' : 'Add new course successfully'}
              extra={
                <>
                  {isEdit ? (
                    ''
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      className={styles.btn}
                      onClick={handleAddNew}>
                      Add new course
                    </Button>
                  )}
                  <Button size="large" className={styles.btn}>
                    <Link to="/course/">Course list</Link>
                  </Button>
                </>
              }
            />
          </Card>
        )}
        {current === 2 && isDone && !isSuccess && (
          <Card>
            <Result
              status="error"
              title="Submission failed"
              extra={
                <>
                  <Button type="primary" size="large" className={styles.btn} onClick={handleAddNew}>
                    Try again
                  </Button>
                  <Button size="large" className={styles.btn}>
                    <Link to="/course/">Course list</Link>
                  </Button>
                </>
              }
            />
          </Card>
        )}
      </div>
    </>
  );
};

export default AddCourse;
