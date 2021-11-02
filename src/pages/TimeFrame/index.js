import React, { createRef, useEffect, useState } from 'react';
import FormAdd from 'components/TimeFrame/FormAdd';
import moment from 'moment';
import { Row, Col, Table, Tooltip, Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { timeFrameState$ } from 'redux/selectors';
import * as timeFrameActions from 'redux/actions/timeFrames';
import FormEdit from 'components/TimeFrame/FormEdit';

const TimeFrame = () => {
  const columns = [
    {
      key: 'id',
      title: 'No.',
      align: 'center',
      render: (record, value, index) => <span>{index + 1}</span>,
    },
    {
      key: 'start',
      title: 'Start Time',
      dataIndex: 'startingTime',
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        Date.parse(`2/4/2000 ${a.startingTime}`) - Date.parse(`2/4/2000 ${b.startingTime}`),
      render: value => {
        return <span>{value.slice(0, value.length - 3)}</span>;
      },
      align: 'center',
    },
    {
      key: '-',
      align: 'center',
      render: () => <span>-</span>,
    },
    {
      key: 'end',
      title: 'End time',
      dataIndex: 'endingTime',
      sorter: (a, b) =>
        Date.parse(`2/4/2000 ${a.endingTime}`) - Date.parse(`2/4/2000 ${b.endingTime}`),
      render: value => {
        return <span>{value.slice(0, value.length - 3)}</span>;
      },
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
  const [dataSource, setDataSource] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [recordEdited, setIdRecordEdited] = useState({});
  const dispatch = useDispatch();
  const timeFrames = useSelector(timeFrameState$);
  const formRef = createRef();

  useEffect(() => {
    dispatch(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest());
  }, []);

  //Set data source
  useEffect(() => {
    setDataSource(timeFrames.data);
    if (timeFrames.isLoading && timeFrames.error.length > 0) {
      notification.error({
        message: timeFrames.error,
      });
    }
  }, [timeFrames]);

  //Notification success
  useEffect(() => {
    if (timeFrames.isSuccess) {
      notification.success({
        message: 'Successfully!',
      });
    }
  }, [timeFrames.isLoading]);

  //reset form add
  useEffect(() => {
    formRef.current.resetFields();
  }, [timeFrames.data]);
  //Add
  const handleAddTimeFrames = values => {
    const newTimeFrames = [];
    for (var i = 0; i < values.timeFrames.length; ++i) {
      const item = values.timeFrames[i];
      const start = moment(item.time[0]).format('HH:mm');
      const end = moment(item.time[1]).format('HH:mm');
      const tmp = { startingTime: start, endingTime: end };
      newTimeFrames.push(tmp);
    }
    dispatch(timeFrameActions.createTimeFrame.createTimeFrameRequest(newTimeFrames));
  };

  //Delete
  const handleDelete = idTimeFrame => {
    const tmp = dataSource.filter(item => item.idTimeFrame != idTimeFrame);
    setDataSource(tmp);
    dispatch(timeFrameActions.deleteTimeFrame.deleteTimeFrameRequest(idTimeFrame));
  };

  //Update
  const handleUpdate = value => {
    const start = moment(value.timeFrame[0]).format('HH:mm');
    const end = moment(value.timeFrame[1]).format('HH:mm');
    const tmp = { idTimeFrame: recordEdited.idTimeFrame, startingTime: start, endingTime: end };
    dispatch(timeFrameActions.updateTimeFrame.updateTimeFrameRequest(tmp));
    setIsEdit(false);
  };
  return (
    <Row gutter={50}>
      <Col span={16}>
        <Table columns={columns} dataSource={dataSource} loading={timeFrames.isLoading} />
      </Col>
      <Col span={8}>
        {isEdit && <FormEdit onSave={handleUpdate} record={recordEdited} onCancel={setIsEdit} />}
        {!isEdit && <FormAdd onSave={handleAddTimeFrames} formRef={formRef} />}
      </Col>
    </Row>
  );
};

export default TimeFrame;
