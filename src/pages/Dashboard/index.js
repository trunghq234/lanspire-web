import { Card, Col, Row } from 'antd';
import StatisticCard from 'components/Dashboard/StatisticCard';
import RevenueChart from 'components/Dashboard/RevenueChart';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { getUser } from 'redux/actions/users';
import { classState$, courseState$, studentState$, userState$ } from 'redux/selectors';
import { getStudents } from 'redux/actions/students';
import moment from 'moment';
import reportApi from 'api/reportApi';
import TopClasses from 'components/Dashboard/TopClasses';
import { parseThousand } from 'utils/stringHelper';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: students } = useSelector(studentState$);
  const { data: courses } = useSelector(courseState$);
  const { data: classes } = useSelector(classState$);
  const user = useSelector(userState$);
  const idUser = localStorage.getItem('idUser');
  useEffect(() => {
    dispatch(getUser.getUserRequest(idUser));
  }, [dispatch]);

  useEffect(() => {
    getRevenue();
    dispatch(getStudents.getStudentsRequest());
    dispatch(getCourses.getCoursesRequest());
    dispatch(getClasses.getClassesRequest());
  }, []);

  const [revenue, setRevenue] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [statLoading, setStatLoading] = useState(true);

  const getRevenue = () => {
    const from = moment().subtract(90, 'days').format('YYYY-MM-DD').toString();
    const to = moment().format('YYYY-MM-DD').toString();
    setChartLoading(true);
    reportApi
      .getFromTo(from, to)
      .then(res => {
        setChartLoading(false);
        setRevenue(res.data);
      })
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };

  const getThisMonthRevenue = () => {
    let thisMonthRevenue = 0;
    const startOfMonth = moment().startOf('month');
    revenue.map(e => {
      if (moment(e.date, 'YYYY-MM-DD').isAfter(startOfMonth)) {
        thisMonthRevenue += parseInt(e.total);
      }
    });
    return thisMonthRevenue;
  };

  const getInProgressClasses = () => {
    let numOfClasses = 0;
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    classes.map(e => {
      if (moment(e.date, 'YYYY-MM-DD').isBetween(startOfMonth, endOfMonth)) {
        numOfClasses++;
      }
    });
    return numOfClasses;
  };

  useEffect(() => {
    if (revenue.length > 0 && students.length > 0) {
      setStatLoading(false);
    }
  }, [revenue, students]);

  const statistics = [
    {
      title: 'This month revenue',
      value: `${parseThousand(getThisMonthRevenue())} ₫`,
      color: '#1890ff',
    },
    {
      title: 'Total students',
      value: parseThousand(students.length),
      color: '#1890ff',
    },
    {
      title: 'Classes in progress',
      value: parseThousand(getInProgressClasses()),
      color: '#1890ff',
    },
    {
      title: 'Total courses',
      value: parseThousand(courses.length),
      color: '#1890ff',
    },
  ];

  return (
    <div>
      <h3 className="heading">Dashboard</h3>
      <Row gutter={[20, 20]}>
        {statistics.map(item => (
          <Col key={item.title} span={6}>
            <StatisticCard
              color={item.color}
              title={item.title}
              value={item.value}
              loading={statLoading}
            />
          </Col>
        ))}
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col span={18}>
              <RevenueChart data={revenue} isLoading={chartLoading} />
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%', height: '100%' }}>
                <TopClasses />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
