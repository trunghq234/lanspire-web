import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AddFileExam from '../AddFileExam';
import { useDispatch, useSelector } from 'react-redux';
import { examState$ } from 'redux/selectors';
import { getExamsByClass } from 'redux/actions/exams';
import { useParams } from 'react-router';
import moment from 'moment';

const ClassExam = ({ classData }) => {
  const columns = [
    {
      title: 'Exam name',
      dataIndex: 'examName',
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      align: 'center',
    },
    {
      title: 'Column name',
      dataIndex: 'columnName',
      align: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'postedDate',
      align: 'center',
    },
    {
      title: '',
      dataIndex: 'idExam',
      align: 'center',
      width: '15%',
      render: idExam => {
        return (
          <Tooltip title="Edit exam">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setIsVisible(true);
                const res = examList.find(exam => exam.idExam === idExam);
                setSelectedExam(res);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [existedColumn, setExistedColumn] = useState([]);
  const [selectedExam, setSelectedExam] = useState();

  const { idClass } = useParams();
  const dispatch = useDispatch();
  const { data: examList, isLoading } = useSelector(examState$);
  useEffect(() => {
    dispatch(getExamsByClass.getExamsByClassRequest(idClass));
  }, []);

  useEffect(() => {
    mappingData(examList);
    getIdColumn(examList);
  }, [examList]);

  const mappingData = exams => {
    const res = [];
    exams.map(exam =>
      res.push({
        idExam: exam.idExam,
        examName: exam.examName,
        fileUrl: exam.fileUrl,
        postedDate: moment(exam.postedDate).format('DD/MM/YYYY'),
        typeName: exam.TestType.typeName,
        columnName: exam.Column_Transcript.columnName,
      })
    );
    setDataSource(res);
  };
  const getIdColumn = exams => {
    const res = [];
    exams.map(exam => res.push(exam.Column_Transcript.idColumn));
    setExistedColumn(res);
  };
  return (
    <Row gutter={[20, 20]}>
      <Col span={4}>
        <h3>Class exams</h3>
      </Col>
      <Col flex="auto" />
      <Col>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setSelectedExam(null);
            setIsVisible(true);
          }}>
          Add exam
        </Button>
      </Col>
      <Col span={24}>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={dataSource}
          rowKey={row => row.idExam}
        />
      </Col>
      <AddFileExam
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        existedColumn={existedColumn}
        classData={classData}
        selectedExam={selectedExam}
      />
    </Row>
  );
};

export default ClassExam;
