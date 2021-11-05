import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Col, Form, Input, Row, message, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { columnTranscriptState$ } from 'redux/selectors';
import { createColumnTranscript, updateColumnTranscript } from 'redux/actions/columnTranscripts';
import { validateMessages } from 'constant/validationMessage';

const AddColumnTranscript = ({ trigger }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: columnTranscripts, isSuccess } = useSelector(columnTranscriptState$);
  const { idColumn } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();

  const [min, setMin] = useState();
  const [max, setMax] = useState(Math.max());

  useEffect(() => {
    if (idColumn) {
      setIsEdit(true);
      const columnTranscript = columnTranscripts.find(
        columnTranscript => columnTranscript.idColumn === idColumn
      );
      console.log(columnTranscript);
      form.setFieldsValue({
        columnName: columnTranscript.columnName,
        min: columnTranscript.min,
        max: columnTranscript.max,
      });
    }
  }, [idColumn, trigger]);

  const handleSubmit = () => {
    const { columnName, min, max } = form.getFieldValue();
    if (columnName) {
      if (isEdit) {
        dispatch(
          updateColumnTranscript.updateColumnTranscriptRequest({
            idColumn: idColumn,
            columnName: columnName,
            min: min,
            max: max,
          })
        );
      } else {
        dispatch(
          createColumnTranscript.createColumnTranscriptRequest({
            columnName: columnName,
            min: min,
            max: max,
          })
        );
      }
      if (isSuccess) {
        message.success({
          content: isEdit ? 'Updated successfully' : 'Add column successfully',
        });
        isEdit ? history.push('/columntranscript/') : '';
      } else {
        message.error({
          content: 'Error',
        });
      }
      form.resetFields();
    }
  };

  const handleReset = () => {
    form.resetFields();
    if (isEdit) {
      history.push('/columntranscript/');
    }
  };

  const uniqueValidator = (rule, value, callback) => {
    try {
      const { columnName, min, max } = form.getFieldsValue();
      const res = columnTranscripts.find(
        column => column.columnName === columnName && column.min === min && column.max === max
      );
      if (res) {
        callback('');
        message.error('Column must be unique');
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };
  return (
    <>
      <h3>{isEdit ? 'Update column' : 'Add column'}</h3>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        validateMessages={validateMessages}>
        <Row gutter={[20, 0]}>
          <Col span={24}>
            <Form.Item
              label="Column name"
              name="columnName"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
              <Input placeholder="Column name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Min"
              name="min"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
              <InputNumber
                min={0}
                max={max - 1}
                placeholder="Min"
                style={{ minWidth: '100%' }}
                onChange={e => setMin(e)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Max"
              name="max"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
              <InputNumber
                min={0 || min + 1}
                placeholder="Max"
                style={{ minWidth: '100%' }}
                onChange={e => setMax(e)}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <div className="flex">
                <Button htmlType="submit" block type="primary" size="large">
                  {isEdit ? 'Update' : 'Add'}
                </Button>
                <Button htmlType="reset" size="large" onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddColumnTranscript;
