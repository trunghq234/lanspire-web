import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const AppFooter = () => {
  return (
    <div className={styles.container}>
      <p>
        Copyright © 2021 | <Link to="/about">QBAT</Link>
      </p>
    </div>
  );
};

export default AppFooter;
