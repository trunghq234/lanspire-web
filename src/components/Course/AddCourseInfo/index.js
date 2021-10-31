import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Input, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$, levelState$ } from 'redux/selectors';
import { getCourseTypes } from 'redux/actions/courseTypes';
import { getLevels } from 'redux/actions/levels';

const { TextArea } = Input;
const { Option } = Select;

const AddCourseInfo = ({ form, goNext, handleSubmitCourse }) => {
  const [pointList, setPointList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [levelList, setLevelList] = useState([]);

  const dispatch = useDispatch();
  const { data: courseTypeList } = useSelector(courseTypeState$);
  const { data: levels } = useSelector(levelState$);

  useEffect(() => {
    dispatch(getCourseTypes.getCourseTypesRequest());
    dispatch(getLevels.getLevelsRequest());
  }, []);

  useEffect(() => {
    const { levelName: levelIndex } = form.getFieldsValue();
    if (levelIndex) {
      handleSelectLevel(levelIndex);
    }
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

  const handleNext = () => {
    const {
      courseName,
      fee,
      description,
      max,
      point: pointIndex,
      typeName: typeIndex,
    } = form.getFieldsValue();
    const level = pointList[pointIndex];
    const courseType = courseTypeList[typeIndex];
    console.log({ courseName, fee, description, max, level, courseType });
    // handleSubmitCourse({
    //   courseName: courseName,
    //   fee: fee,
    //   description: description,
    //   max: max,
    //   idLevel: level.idLevel,
    //   idCourseType: courseType.idCourseType,
    //   Level: level,
    //   CourseType: courseType,
    // });
    goNext();
  };

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
        <Form.Item label="Level name" name="levelName" rules={[{ required: true }]}>
          <Select showSearch onChange={e => handleSelectLevel(e)}>
            {levelList.map((level, index) => (
              <Option key={index}>{level}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Point" name="point" rules={[{ required: true }]}>
          <Select showSearch disabled={!isSelected}>
            {pointList.map((level, index) => (
              <Option key={index}>{level.point}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Coure type name" name="typeName" rules={[{ required: true }]}>
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
