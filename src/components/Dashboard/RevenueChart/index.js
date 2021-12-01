import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Select, Spin } from 'antd';
import { Line } from '@ant-design/charts';
import styles from './index.module.less';
import moment from 'moment';

const { Option } = Select;

const RevenueChart = ({ data, isLoading }) => {
  const [dataChart, setDataChart] = useState([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (data.length != 0) {
      renderData(days);
    }
  }, [data, days]);

  const renderData = days => {
    const earlyDate = moment().subtract(days, 'days');
    const tmp = data.filter(e => moment(e.date, 'YYYY-MM-DD').isAfter(earlyDate));
    setDataChart(tmp);
  };

  const configChart = {
    data: dataChart,
    padding: 'auto',
    xField: 'date',
    yField: 'total',
    xAxis: {
      tickCount: 15,
    },
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''
            .concat(v)
            .replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
              return ''.concat(s, ',');
            })
            .concat('đ');
        },
      },
    },
    xAxis: {
      label: {
        formatter: function formatter(v) {
          return moment(v).format('DD/MM/YYYY');
        },
      },
    },
    tooltip: {
      formatter: function formatter(v) {
        return {
          name: moment(v.date).format('DD/MM/YYYY'),
          value: ''.concat(v.total).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          }),
        };
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 400,
      },
    },
  };

  return (
    <Card>
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <h3>Revenue chart</h3>
        </Col>
        <Col flex="auto" />
        <Col span={4}>
          <Select
            className={styles.select}
            placeholder="Select mode"
            defaultValue="Last 7 days"
            onChange={setDays}>
            <Option key="7" value="7">
              Last 7 days
            </Option>
            <Option key="30" value="30">
              Last 30 days
            </Option>
            <Option key="90" value="90">
              Last 90 days
            </Option>
          </Select>
        </Col>
        <Col span={24}>
          <Spin spinning={isLoading} tip="Loading...">
            <Line {...configChart} />
          </Spin>
        </Col>
      </Row>
    </Card>
  );
};

export default RevenueChart;
