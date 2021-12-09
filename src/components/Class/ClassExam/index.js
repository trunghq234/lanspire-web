import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, notification, Row, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AddFileExam from '../AddFileExam';
import { useDispatch, useSelector } from 'react-redux';
import { examState$ } from 'redux/selectors';
import { getExamsByClass, deleteExam } from 'redux/actions/exams';
import { useParams } from 'react-router';
import moment from 'moment';

const { confirm } = Modal;

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
      title: 'Test time',
      dataIndex: 'testTime',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Test date',
      dataIndex: 'testDate',
      align: 'center',
      width: '15%',
    },
    {
      title: '',
      dataIndex: ['idExam'],
      align: 'center',
      width: '10%',
      render: (idExam, currentExam) => {
        return (
          <div className="flex">
            <Tooltip title="Edit exam">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => {
                  setIsVisible(true);
                  const res = examList.find(exam => exam.idExam === idExam);
                  setSelectedExam(res);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete exam">
              <Button
                ghost
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(currentExam)}
              />
            </Tooltip>
          </div>
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
  const { data: examList, isLoading, isSuccess } = useSelector(examState$);
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
        testTime: moment(exam.testTime, 'HH:mm:ss').format('HH:mm'),
        testDate: moment(exam.testDate).format('DD/MM/YYYY'),
        typeName: exam.TestType.typeName,
        columnName: exam.Columns.columnName,
      })
    );
    setDataSource(res);
  };

  const getIdColumn = exams => {
    const res = [];
    exams.map(exam => res.push(exam.Columns.idColumn));
    setExistedColumn(res);
  };

  const handleDelete = exam => {
    const testDate = moment(exam.testDate, 'DD/MM/YYYY');
    const isPassed = moment(testDate).isSameOrBefore(moment());
    if (isPassed) {
      notification.warning({
        message: 'Exam cannot be deleted!',
        description: 'Test date is passed',
      });
      return;
    }
    confirm({
      title: 'Do you want to delete this exam?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      onOk() {
        dispatch(deleteExam.deleteExamRequest(exam.idExam));

        isSuccess
          ? notification.success({
              message: 'Deleted successfully',
            })
          : notification.success({
              message: 'Failed to delete',
            });
      },
      onCancel() {},
    });
  };
  return (
    <Row gutter={[20, 20]}>
      <Col span={4}>
        <h3 className="heading">Class exams</h3>
      </Col>
      <Col flex="auto" />
      <Col span={4}>
        <Button
          block
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
