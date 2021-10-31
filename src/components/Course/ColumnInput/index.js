import React, { useState } from 'react';
import { Form, Input, InputNumber, Space, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const ColumnInput = props => {
  const [min, setMin] = useState();
  const [max, setMax] = useState(Math.max());

  return (
    <Row justify="center" gutter={[20, 10]}>
      <Form.List name="columns" rules>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Col key={key} span={14}>
                <Space
                  className="hide-label"
                  style={{ width: '100%' }}
                  size="large"
                  align="baseline">
                  <Form.Item
                    {...restField}
                    label="Column"
                    name={[name, 'columnname']}
                    fieldKey={[fieldKey, 'columnname']}
                    rules={[{ required: true }]}>
                    <Input className={styles.input} placeholder="Column name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Min point"
                    name={[name, 'min']}
                    fieldKey={[fieldKey, 'min']}
                    rules={[{ required: true }]}>
                    <InputNumber
                      min={0}
                      max={max - 1}
                      className={styles.input}
                      placeholder="Min"
                      onChange={e => setMin(e)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Max point"
                    name={[name, 'max']}
                    fieldKey={[fieldKey, 'max']}
                    rules={[{ required: true }]}>
                    <InputNumber
                      min={0 || min + 1}
                      className={styles.input}
                      placeholder="Max"
                      onChange={e => setMax(e)}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(name);
                      props.decreaseColNum();
                    }}
                  />
                </Space>
              </Col>
            ))}
            <Col span={14}>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    props.increaseColNum();
                  }}
                  block
                  icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </Col>
          </>
        )}
      </Form.List>
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
              Prev
            </Button>
          </div>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ColumnInput;
