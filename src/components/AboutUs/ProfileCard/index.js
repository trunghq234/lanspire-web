import React from 'react';
import { Col, Row } from 'antd';
import styles from './index.module.less';
import github from 'assets/svg/github.svg';
import facebook from 'assets/svg/facebook.svg';

const ProfileCard = ({ user }) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col span={24} className={styles.bg} />
        <Col span={24} className={styles.content}>
          <img src={user.imgUrl} alt="avatar" />
          <h4>{user.name}</h4>
          <p>{user.title}</p>
          <div className={styles.social}>
            <a href={user.github} aria-label="github" target="_blank">
              <img src={github} alt="github" />
            </a>
            <a href={user.facebook} aria-label="facebook" target="_blank">
              <img src={facebook} alt="facebook" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileCard;
