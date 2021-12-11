import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, notification, Popconfirm, Row, Table, Tooltip } from 'antd';
import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as classActions from 'redux/actions/classes';
import * as lecturerActions from 'redux/actions/lecturers';
import { classState$, lecturerState$ } from 'redux/selectors';
import style from './index.module.less';

const AppointLecturer = () => {
  const columns = [
    {
      key: 'id',
      title: 'No.',
      align: 'center',
      render: (record, value, index) => <span>{index + (currentPage - 1) * pageSize + 1}</span>,
    },
    {
      key: 'class',
      title: 'Class',
      dataIndex: 'className',
      align: 'center',
    },
    {
      key: 'lecturer',
      title: 'Lecturer',
      dataIndex: 'lecturerName',
      align: 'center',
    },
    {
      title: '',
      align: 'center',
      render: record => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Tooltip title="Edit information">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEdit(true);
                  setIdRecordEdited(record);
                }}
              />
            </Tooltip>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.idTimeFrame)}>
              <Tooltip title="Delete">
                <Button danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [recordEdited, setIdRecordEdited] = useState({});
  const dispatch = useDispatch();
  const lecturers = useSelector(lecturerState$);
  const classes = useSelector(classState$);
  const formRef = createRef();

  useEffect(() => {
    dispatch(lecturerActions.getLecturers.getLecturersRequest());
  }, []);

  useEffect(() => {
    dispatch(classActions.getClasses.getClassesRequest());
  }, []);
  //Set data source
  useEffect(() => {
    mappingDatasource(lecturers.data, classes.data);
  }, [lecturers, classes]);

  //Notification success
  useEffect(() => {
    if (lecturers.isSuccess) {
      notification.success({
        message: 'Successfully!',
      });
    }
  }, [lecturers.isLoading]);

  //Delete
  const handleDelete = (idClass, idLecturer) => {
    const tmp = dataSource.filter(item => item.idClass != idClass || item.idLecturer != idLecturer);
    setDataSource(tmp);
    dispatch(lecturerActions.deleteLecturer.deleteLecturerRequest(idTimeFrame));
  };
  //convert data
  const mappingDatasource = (lecturers, classes) => {
    const res = [];
    classes.map(classRoom => {
      lecturers.map(lecturer => {
        if (classRoom.Lecturers) {
          classRoom.Lecturers.map(teaching => {
            if (teaching.idLecturer == lecturer.idLecturer) {
              res.push({
                idLecturer: lecturer.idLecturer,
                idClass: classRoom.idClass,
                className: classRoom.className,
                lecturerName: lecturer.displayName,
              });
            }
          });
        }
      });
    });
    setDataSource(res);
  };
  return (
    <Col span={24}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/class">Classes</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/class/appoint">Appoint lecturer</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Appoint lecturer</h3>
      <Row gutter={50}>
        <Col span={24}>
          <Card>
            <Table
              columns={columns}
              dataSource={dataSource}
              loading={lecturers.isLoading}
              pagination={{
                showSizeChanger: true,
                current: currentPage,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default AppointLecturer;
