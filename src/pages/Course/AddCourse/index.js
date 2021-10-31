import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Steps, Button, Result, Form, Card, message } from 'antd';
import { useStepsForm } from 'sunflower-antd';
import styles from './index.module.less';
import AddCourseInfo from 'components/Course/AddCourseInfo';
import ColumnInput from 'components/Course/ColumnInput';
import { useDispatch, useSelector } from 'react-redux';
import { courseState$ } from 'redux/selectors';
import { createCourse, getCourses } from 'redux/actions/courses';
import { validateMessages } from 'constant/validationMessage';

const { Step } = Steps;

const AddCourse = () => {
  const [isDone, setIsDone] = useState(false);
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector(courseState$);

  const [isBack, setIsBack] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [colNum, setColNum] = useState(0);
  const [course, setCourse] = useState({});
  const increaseColNum = () => {
    const res = colNum + 1;
    setColNum(res);
    console.log(res);
  };
  const decreaseColNum = () => {
    const res = colNum - 1;
    console.log(res);
    setColNum(res);
  };
  const handleSubmitCourse = value => {
    setCourse(value);
  };

  const { idCourse } = useParams();
  useEffect(() => {
    if (idCourse) {
      setIsEdit(true);
      // dispatch(getCourses.getCoursesRequest)
      form.setFieldsValue({});
    }
  }, [idCourse]);

  const { form, current, gotoStep, stepsProps, formProps, submit, formLoading } = useStepsForm({
    total: 3,
    defaultCurrent: 0,
    isBackValidate: false,
    async submit(values) {
      console.log({ values });
      if (colNum > 0) {
        if (isEdit) {
          dispatch(updateCourse.updateCourseRequest(course));
        } else {
          dispatch(createCourse.createCourseRequest(course));
          //create columns
        }
        await new Promise(r => setTimeout(r, 500));
        setIsDone(true);
        return isSuccess;
      } else {
        message.warning('Number of column must higher than 0');
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
    submit().then(result => {
      if (result) {
        gotoStep(current + 1);
      }
    });
  };
  const handleAddNew = () => {
    form.resetFields();
    gotoStep(0);
    setIsDone(false);
  };
  const formList = [
    <AddCourseInfo form={form} handleSubmitCourse={handleSubmitCourse} goNext={goNext} />,
    <ColumnInput
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      goPrev={goPrev}
      increaseColNum={increaseColNum}
      decreaseColNum={decreaseColNum}
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
        <Breadcrumb.Item>
          <Link to="/course/add">Add course</Link>
        </Breadcrumb.Item>
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
        {current === 2 && isSuccess && (
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
        {current === 2 && !isSuccess && (
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
              }></Result>
          </Card>
        )}
      </div>
    </>
  );
};

export default AddCourse;
