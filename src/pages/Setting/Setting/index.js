import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Tabs } from 'antd';
import { ExclamationCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import CenterInfo from 'components/Setting/CenterInfo';
import Parameter from 'components/Setting/Parameter';

const { TabPane } = Tabs;

const Setting = props => {
  const [offset, setOffset] = useState(6);
  useEffect(() => {
    if (screen.width <= 768) {
      setOffset(0);
    }
  }, []);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Dashboard</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Setting</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="heading">Setting</h3>
      <Card>
        <Tabs tabPosition="left">
          <TabPane
            tab={
              <span>
                <ExclamationCircleOutlined />
                Information
              </span>
            }
            key="1">
            <CenterInfo />
          </TabPane>
          <TabPane
            tab={
              <span>
                <SolutionOutlined />
                Regulations
              </span>
            }
            key="2">
            <Parameter />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Setting;
