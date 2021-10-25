import React, { useState } from 'react';
import { Card, Col, Form, Input, Row } from 'antd';
import TypingSelect from 'components/common/TypingSelect';

const LevelInfo = props => {
  const [levelInfo, setLevelInfo] = useState();
  const levelList = [
    { type: 'IELTS', lang: 'EN' },
    { type: 'TOEIC', lang: 'EN' },
  ];
  return (
    <Card>
      <h3>Level</h3>
      <Form layout="vertical">
        <Input.Group>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="Type" name="level" rules={[{ required: true }]}>
                <TypingSelect
                  value={levelInfo}
                  options={levelList}
                  disabled={levelList.length === 0}
                  optionName="type"
                  optionKey="type"
                  placeholder="Level"
                  callbackSelection={val => {
                    setLevelInfo(val);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Score" name="score" rules={[{ required: true }]}>
                <Input placeholder="Score" maxLength="10" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    </Card>
  );
};

export default LevelInfo;
