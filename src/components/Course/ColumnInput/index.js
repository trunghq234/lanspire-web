import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'antd';
import styles from './index.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { columnTranscriptState$ } from 'redux/selectors';
import { getColumnTranscripts } from 'redux/actions/columnTranscripts';

const ColumnInput = ({ editCourse, ...props }) => {
  const columns = [
    {
      title: 'Column name',
      dataIndex: 'columnName',
    },
    {
      title: 'Min',
      dataIndex: 'min',
      align: 'center',
    },
    {
      title: 'Max',
      dataIndex: 'max',
      align: 'center',
    },
  ];

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(columnTranscriptState$);
  useEffect(() => {
    dispatch(getColumnTranscripts.getColumnTranscriptsRequest());
  }, []);

  const [selected, setSelected] = useState([]);
  useEffect(() => {
    if (editCourse) {
      const selectedKey = editCourse.Columns.map(column => column.idColumn);
      setSelected(selectedKey);
      props.changeColNum(selectedKey);
    }
  }, [editCourse]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.changeColNum(selectedRowKeys);
      setSelected(selectedRowKeys);
    },
  };
  return (
    <Row justify="center" gutter={[20, 10]}>
      <Col span={16}>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={data}
          rowKey={row => row.idColumn}
          rowSelection={{
            selectedRowKeys: selected,
            ...rowSelection,
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '50', '100'],
          }}
        />
      </Col>
      <Col span={14}>
        <Form.Item>
          <div className={styles.flex}>
            <Button
              type="primary"
              size="large"
              block
              loading={props.formLoading}
              onClick={props.handleSubmit}>
              Submit
            </Button>
            <Button style={{ width: '50%' }} block size="large" onClick={props.goPrev}>
              Back
            </Button>
          </div>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ColumnInput;
