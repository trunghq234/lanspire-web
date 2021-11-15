import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { interfaceDeclaration } from '@babel/types';
import { Button, Table, Tooltip, Tag, Modal, Input, Form, notification } from 'antd';
import classApi from 'api/classApi';
import examApi from 'api/examApi';
import studentApi from 'api/studentApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Transcript = () => {
  const [form] = Form.useForm();

  const { idClass } = useParams();
  const [classRoom, setClassRoom] = useState();
  const [columns, setColumns] = useState([]);
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState();
  const [currentColumn, setCurrentColumn] = useState();
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoanding] = useState(true);
  useEffect(() => {
    classApi.getById(idClass).then(res => {
      setClassRoom(res.data);
    });
    examApi.getByIdClass(idClass).then(res => {
      setExams(res.data);
    });
  }, [idClass]);
  useEffect(() => {
    if (classRoom) {
      mappingDatasource(classRoom);
    }
  }, [classRoom]);
  const showModal = (idColumn, idStudent) => e => {
    setCurrentColumn(idColumn);
    setCurrentStudent(idStudent);
    setIsModalVisible(true);
  };

  const handleOk = value => {
    const isHasExam = exams.find(exam => exam.idColumn == currentColumn);
    if (value.score < isHasExam.Columns.min || value.score > isHasExam.Columns.max) {
      notification['error']({
        message: 'Error',
        description: `Can't mark score out of range`,
      });
    } else {
      if (isHasExam) {
        if (isHasExam.testDay) {
          if (moment().isBefore(moment(isExam.testDay))) {
            notification['error']({
              message: 'Error',
              description: `The exam hasn't taken place yet`,
            });
          } else {
            handleMark(isHasExam, value.score);
          }
        } else {
          console.log(isHasExam);
          handleMark(isHasExam, value.score);
        }
      } else {
        notification['error']({
          message: 'Error',
          description: `This column doesn't have exam.`,
        });
      }
    }

    setIsModalVisible(false);
  };
  const handleMark = (exam, score) => {
    const data = {
      idStudent: currentStudent,
      idExam: exam.idExam,
      score: score,
    };
    studentApi.updateScore(data).then(res => {
      console.log(res);
      if (res.status == 200) {
        notification['success']({
          message: 'Successfully',
          description: 'Mark score for student successfully',
        });
      } else {
        notification['error']({
          message: 'Error',
          description: `Can't mark score.`,
        });
      }
      classApi.getById(idClass).then(res => {
        setClassRoom(res.data);
      });
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const mappingDatasource = classRoom => {
    const students = classRoom.Students;
    const columns = classRoom.Course.Columns;
    let temp = [],
      temp1 = [
        {
          title: 'Name of student',
          dataIndex: 'student',
          key: 'student',
          width: '15%',
          fixed: 'left',
        },
      ];
    columns.map(column => {
      temp1.push({
        title: (
          <div>
            <h4>{column.columnName}</h4>
            <h6>
              {column.min} - {column.max}
            </h6>
          </div>
        ),
        dataIndex: column.columnName,
        key: column.idColumn,
        avarage: (parseInt(column.min) + parseInt(column.max)) / 2,
        align: 'center',
      });
    });
    students.map(student => {
      let customColumn = {
        key: student.idStudent,
        student: student.User.displayName,
      };
      temp1.map(column => {
        if (column.dataIndex != 'student') {
          const test = student.Testings.find(testing => testing.Exam.idColumn == column.key);
          if (test) {
            let color = 'green';
            if (test.score < column.avarage) {
              color = 'volcano';
            }
            customColumn[column.dataIndex] = (
              <span>
                <Tag color={color}>{test.score}</Tag>
                <Tooltip title="Edit score">
                  <Button
                    type="primary"
                    ghost
                    icon={<EditOutlined />}
                    onClick={showModal(column.key, customColumn.key)}></Button>
                </Tooltip>
              </span>
            );
          } else {
            customColumn[column.dataIndex] = (
              <span>
                <Tooltip title="Input score">
                  <Button
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                    onClick={showModal(column.key, customColumn.key)}></Button>
                </Tooltip>
              </span>
            );
          }
        }
      });
      temp.push({
        ...customColumn,
      });
    });
    setIsLoanding(false);
    setColumns(temp1);
    setStudents(temp);
  };
  return (
    <div>
      <Table columns={columns} loading={isLoading} dataSource={students} scroll={{ x: 'auto' }} />
      <Modal title="" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
        <Form layout="vertical" form={form} name="form_in_modal" onFinish={handleOk}>
          <Form.Item
            name="score"
            label="Score"
            placeholder="Score"
            rules={[
              {
                required: true,
                message: 'Please input the score of student!',
              },
            ]}>
            <Input placeholder="Score" maxLength="255" />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: '100%' }} key="submit" type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Transcript;
