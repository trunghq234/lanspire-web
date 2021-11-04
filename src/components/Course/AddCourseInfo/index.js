import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Input, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$, levelState$ } from 'redux/selectors';
import { getCourseTypes } from 'redux/actions/courseTypes';
import { getLevels } from 'redux/actions/levels';

const { TextArea } = Input;
const { Option } = Select;

const AddCourseInfo = ({ form, goNext, handleSubmitCourse, editCourse }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [levelNameList, setLevelNameList] = useState([]);
  const [pointList, setPointList] = useState([]);

  const dispatch = useDispatch();
  const { data: courseTypeList } = useSelector(courseTypeState$);
  const { data: levels } = useSelector(levelState$);

  useEffect(() => {
    dispatch(getCourseTypes.getCourseTypesRequest());
    dispatch(getLevels.getLevelsRequest());
  }, []);

  useEffect(() => {
    if (levels) {
      const tmp = levels.map(level => level.levelName);
      const res = [...new Set(tmp)];
      setLevelNameList(res);
      const { levelNameIndex } = form.getFieldsValue();
      if (levelNameIndex) {
        handleSelectLevel(levelNameIndex);
      }
    }
  }, [levels]);

  const handleSelectLevel = e => {
    const selected = levelNameList[e];
    const res = levels.filter(level => level.levelName == selected);
    setPointList(res);
    setIsSelected(true);
  };

  const handleNext = () => {
    const { courseName, fee, description, max, pointIndex, typeIndex } = form.getFieldsValue();
    const level = pointList[pointIndex];
    const courseType = courseTypeList[typeIndex];
    let levelInput, courseTypeInput;
    if (editCourse) {
      levelInput = level ? level : editCourse.Level;
      courseTypeInput = courseType ? courseType : editCourse.CourseType;
    } else {
      levelInput = level;
      courseTypeInput = courseType;
    }
    handleSubmitCourse({
      courseName: courseName,
      fee: fee,
      description: description,
      max: max,
      idLevel: levelInput.idLevel,
      idCourseType: courseTypeInput.idCourseType,
      Level: levelInput,
      CourseType: courseTypeInput,
    });
    goNext();
  };
  useEffect(() => {
    if (editCourse) {
      const levelNameIndex = levelNameList.indexOf(editCourse.Level.levelName);
      handleSelectLevel(levelNameIndex);
      // const typeIndex = courseTypeList.findIndex(
      //   type => type.idCourseType === editCourse.idCourseType
      // );
      // const pointIndex = pointList.findIndex(point => point.idLevel === editCourse.idLevel);
      form.setFieldsValue({
        courseName: editCourse.courseName,
        fee: editCourse.fee,
        description: editCourse.description,
        max: editCourse.max,
        levelNameIndex: editCourse.Level.levelName,
        pointIndex: editCourse.Level.point,
        typeIndex: editCourse.CourseType.typeName,
      });
    }
  }, [editCourse]);
  return (
    <Row justify="center" gutter={[40, 10]}>
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
        <Form.Item label="Max number of students" name="max" rules={[{ required: true }]}>
          <InputNumber
            style={{ width: '50%' }}
            min={0}
            maxLength={18}
            placeholder="Max number"
            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Level name" name="levelNameIndex" rules={[{ required: true }]}>
          <Select showSearch onChange={e => handleSelectLevel(e)}>
            {levelNameList.map((level, index) => (
              <Option key={index}>{level}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Point" name="pointIndex" rules={[{ required: true }]}>
          <Select showSearch disabled={!isSelected}>
            {pointList.map((level, index) => (
              <Option key={index}>{level.point}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Coure type name" name="typeIndex" rules={[{ required: true }]}>
          <Select showSearch>
            {courseTypeList.map((level, index) => (
              <Option key={index}>{level.typeName}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item label="Description" name="description">
          <TextArea
            allowClear
            maxLength="255"
            placeholder="Description about the course type"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item>
          <Button htmlType="button" block onClick={handleNext} type="primary" size="large">
            Next
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AddCourseInfo;
