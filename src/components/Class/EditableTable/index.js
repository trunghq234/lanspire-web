import { Button, Col, Form, Input, notification, Row, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import styles from './index.module.less';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  // const toggleEdit = () => {
  //   setEditing(!editing);
  //   form.setFieldsValue({
  //     [dataIndex]: record[dataIndex],
  //   });
  // };

  const save = async () => {
    try {
      const values = await form.validateFields();
      // toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Score is required.`,
          },
        ]}>
        <Input
          style={{
            textAlign: 'center',
            width: '150px',
          }}
          ref={inputRef}
          onChange={save}
          onPressEnter={save}
          onBlur={save}></Input>
      </Form.Item>
    );
    form.setFieldsValue({
      [dataIndex]: children[1],
    });
    // : (
    //   <div className={styles['editable-cell-value-wrap']} onClick={toggleEdit}>
    //     {children}
    //   </div>
    // );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableTable = props => {
  let headersExcel = [];
  const [className, setClassName] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  useEffect(() => {
    if (props.dataSource.length > 0) {
      mappingDatasource(props.dataSource);
    }
    if (props.classRoom) {
      setClassName(props.classRoom.className + '_Transcript.csv');
    }
  }, [props]);
  const mappingDatasource = dataInput => {
    const currentData = dataInput.map(item => ({ ...item }));
    setPreviousData(dataInput);
    const keys = Object.keys(currentData[0]);
    keys.splice(0, 2);
    let data = [];
    data = currentData.map(row => {
      keys.map(keyIndex => {
        if (typeof row[keyIndex] != 'string') {
          const subKeys = Object.keys(row[keyIndex]);

          row[keyIndex] = row[keyIndex][subKeys[0]];
        }
      });
      return row;
    });

    setDataSource(data);
  };
  const handleSave = row => {
    let canSave = true;
    const keys = Object.keys(row);
    keys.splice(0, 2);
    keys.map(key => {
      if (row[key] != 'Input Score' && isNaN(row[key])) {
        canSave = false;
        notification['error']({
          message: 'Error',
          description: `Score must be number`,
        });
      }
    });
    if (canSave) {
      const newData = [...dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setDataSource(newData);
    } else {
      setDataSource(dataSource);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = props.columns.map(col => {
    headersExcel.push({
      label: col.dataIndex,
      key: col.dataIndex,
    });
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  const handleSubmit = () => {
    const keys = Object.keys(previousData[0]);
    keys.splice(0, 2);
    previousData.map(data => {
      const currentData = dataSource.find(newData => newData.key == data.key);
      keys.map(keyIndex => {
        if (!isNaN(currentData[keyIndex])) {
          if (typeof data[keyIndex] == 'string') {
            data[keyIndex] = {
              score: currentData[keyIndex],
              idExem: data[keyIndex],
            };
          } else {
            data[keyIndex].score = currentData[keyIndex];
          }
        }
      });
    });
    props.setDataSource(previousData);
  };
  return (
    <div>
      <Row gutter={[20, 20]} align="top">
        <Col xs={24} sm={16} md={10} lg={8} xl={8}></Col>
        <Col xs={0} md={2} lg={4} xl={8} flex="auto" />
        <Col xs={24} sm={24} md={6} lg={6} xl={4}>
          <Button className={styles.btn} type="primary">
            <CSVLink
              filename={className}
              data={dataSource}
              headers={headersExcel}
              className="btn btn-primary">
              Export to CSV
            </CSVLink>
          </Button>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={4}>
          <Button className={styles.btn} type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Col>
        <Col span={24}>
          <Table
            loading={props.loading}
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 'auto' }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default EditableTable;
