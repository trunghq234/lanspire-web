import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Input, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$, levelState$ } from 'redux/selectors';
import { getCourseTypes } from 'redux/actions/courseTypes';
import { getLevels } from 'redux/actions/levels';
import { numberValidator } from 'utils/validator';

const { TextArea } = Input;
const { Option } = Select;

const AddCourseInfo = ({ form, goNext, handleSubmitCourse, editCourse, isBack }) => {
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
    }
  }, [levels]);

  const handleSelect = value => {
    const res = levels.filter(level => level.levelName == value);
    form.setFieldsValue({ ...form.getFieldsValue, point: null });
    setPointList(res);
    setIsSelected(true);
  };

  const handleNext = () => {
    goNext();
    const { courseName, fee, description, max, levelName, point, type } = form.getFieldsValue();
    const Level = pointList.find(level => level.levelName === levelName && level.point == point);
    const CourseType = courseTypeList.find(element => element.typeName === type);
    if (courseName && fee && max && Level && CourseType) {
      handleSubmitCourse({
        courseName: courseName,
        fee: fee,
        description: description,
        max: max,
        Level: Level,
        idLevel: Level.idLevel,
        CourseType: CourseType,
        idCourseType: CourseType.idCourseType,
      });
    }
  };

  useEffect(() => {
    const { levelName } = form.getFieldsValue();
    handleSelect(levelName);
    if (!isBack) {
      setIsSelected(false);
    }
  }, [isBack]);

  useEffect(() => {
    if (editCourse) {
      handleSelect(editCourse.Level.levelName);
      form.setFieldsValue({
        courseName: editCourse.courseName,
        fee: editCourse.fee,
        description: editCourse.description,
        max: editCourse.max,
        levelName: editCourse.Level.levelName,
        point: editCourse.Level.point,
        type: editCourse.CourseType.typeName,
      });
    }
  }, [editCourse]);
  return (
    <Row justify="center" gutter={[40, 10]}>
      <Col span={8}>
        <Form.Item label="Course name" name="courseName" rules={[{ required: true }]}>
          <Input placeholder="Course name" maxLength="255" />
        </Form.Item>
        <Form.Item
          label="Fee"
          name="fee"
          rules={[{ required: true }, { validator: numberValidator }]}>
          <InputNumber
            style={{ width: '50%' }}
            min={0}
            maxLength={18}
            addonAfter="₫"
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
        <Form.Item label="Level name" name="levelName" rules={[{ required: true }]}>
          <Select showSearch onSelect={e => handleSelect(e)}>
            {levelNameList.map((level, index) => (
              <Option key={index} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Point" name="point" rules={[{ required: true }]}>
          <Select showSearch disabled={!isSelected}>
            {pointList.map((level, index) => (
              <Option key={index} value={level.point}>
                {level.point}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Coure type name" name="type" rules={[{ required: true }]}>
          <Select showSearch>
            {courseTypeList.map((type, index) => (
              <Option key={index} value={type.typeName}>
                {type.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item label="Description" name="description">
          <TextArea
            allowClear
            maxLength="255"
            placeholder="Description about the course"
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
