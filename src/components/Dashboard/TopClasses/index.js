import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Skeleton, Tooltip } from 'antd';
import reportApi from 'api/reportApi';
import moment from 'moment';
import styles from './index.module.less';
import { parseThousand } from 'utils/stringHelper';

const TopClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTopClasses();
  }, []);

  const fetchTopClasses = () => {
    reportApi
      .getTopClasses(moment().month() + 1)
      .then(res => {
        setClasses(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h4>Top classes</h4>
      <Row gutter={[20, 20]}>
        {isLoading ? (
          <Skeleton title={false} paragraph={{ rows: 16 }} />
        ) : (
          classes.map((e, index) => (
            <Col span={24}>
              <Course
                key={index}
                no={index + 1}
                idclass={e.idclass}
                classname={e.classname}
                total={e.total}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

const Course = ({ idclass, classname, total, no }) => {
  return (
    <div className={styles.wrap}>
      <p>{`${no}.`}</p>
      <Tooltip title={`Revenue: ${parseThousand(total)} ₫`}>
        <Link to={`/class/details/${idclass}`}>{classname}</Link>
      </Tooltip>
    </div>
  );
};

export default TopClasses;
