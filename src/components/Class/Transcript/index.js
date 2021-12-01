import { Form, notification } from 'antd';
import classApi from 'api/classApi';
import examApi from 'api/examApi';
import studentApi from 'api/studentApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditableTable from '../EditableTable';
import moment from 'moment';

const Transcript = () => {
  const [form] = Form.useForm();

  const { idClass } = useParams();
  const [classRoom, setClassRoom] = useState();
  const [columns, setColumns] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoanding] = useState(true);
  const [editable, setEditable] = useState();
  useEffect(() => {
    setEditable(
      <EditableTable
        classRoom={classRoom}
        columns={columns}
        dataSource={students}
        loading={isLoading}
        setDataSource={updateDataSource}></EditableTable>
    );
  }, [columns]);
  useEffect(() => {
    classApi.getById(idClass).then(res => {
      setClassRoom(res.data);
    });
    examApi.getByIdClass(idClass).then(res => {
      setExams(res.data);
    });
  }, []);
  useEffect(() => {
    if (classRoom && exams) {
      mappingDatasource(classRoom);
    }
  }, [classRoom, exams]);

  const checkDataTesting = value => {
    if (isNaN(value.score)) {
      notification['error']({
        message: 'Error',
        description: `Score must be a Number`,
      });
      return false;
    }
    const isHasExam = exams.find(exam => exam.idExam == value.idExam);
    console.log(isHasExam);
    if (isHasExam) {
      if (value.score < isHasExam.Columns.min || value.score > isHasExam.Columns.max) {
        notification['error']({
          message: 'Error',
          description: `Can't mark score out of range`,
        });
        return false;
      }
      if (isHasExam.testDate) {
        if (moment().isBefore(moment(isHasExam.testDate))) {
          notification['error']({
            message: 'Error',
            description: `The exam hasn't taken place yet`,
          });
          return false;
        }
      }
    } else {
      notification['error']({
        message: 'Error',
        description: `Column doesn't have exam.`,
      });
      return false;
    }
    return true;
  };
  const handleMark = data => {
    let canUpdate = true;
    data.map(value => {
      if (!checkDataTesting(value)) canUpdate = false;
    });
    if (canUpdate) {
      studentApi.updateScore(data).then(res => {
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
      });
    } else {
      classApi.getById(idClass).then(res => {
        setClassRoom(res.data);
      });
    }
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
        editable: true,
      });
    });
    students.map(student => {
      let customColumn = {
        key: student.idStudent,
        student: student.User.displayName,
      };
      temp1.map(column => {
        if (column.dataIndex != 'student') {
          let exam;
          if (student.Exams.length > 0) {
            exam = student.Exams.find(exam => exam.idColumn == column.key);
          }
          if (exam) {
            customColumn[column.dataIndex] = { score: exam.Testing.score, idExam: exam.idExam };
          } else {
            const isHasExam = exams.find(exam => exam.idColumn == column.key);
            if (isHasExam) {
              customColumn[column.dataIndex] = { score: 'Input Score', idExam: isHasExam.idExam };
            } else {
              customColumn[column.dataIndex] = 'Input Score';
            }
          }
        }
      });
      temp.push({
        ...customColumn,
      });
    });
    console.log(temp);
    setIsLoanding(false);
    setColumns(temp1);
    setStudents(temp);
  };

  const updateDataSource = newData => {
    let updateData = [];
    const keys = Object.keys(newData[0]);
    keys.splice(0, 2);
    newData.map(data => {
      keys.map(key => {
        if (typeof data[key] != 'string') {
          if (!isNaN(data[key].score)) {
            updateData.push({
              idExam: data[key].idExam,
              score: data[key].score,
              idStudent: data.key,
            });
          }
        }
      });
    });
    handleMark(updateData);
  };
  return <div>{editable}</div>;
};

export default Transcript;
