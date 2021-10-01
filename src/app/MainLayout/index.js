import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './main.module.less';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import logo from 'assets/images/logo.png';
import { menuItems } from 'routes/AdminRoutes';
import AppFooter from 'components/layout/Footer';

const MainLayout = props => {
  return (
    <ProLayout
      title="Lanspire"
      logo={logo}
      fixSiderbar
      fixedHeader
      layout="mix"
      contentWidth="Fluid"
      navTheme="dark"
      {...menuItems}
      onMenuHeaderClick={e => console.log('route to /')}
      // menuItemRender={(item, dom) => (
      //   <a
      //     onClick={e => {
      //       console.log(e);
      //     }}>
      //     aassd
      //   </a>
      // )}

      rightContentRender={() => (
        <div>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
        </div>
      )}
      footerRender={() => <DefaultFooter links={[]} copyright="QBAT" />}>
      <div className={styles.container}>
        <Switch>
          {props.routes}
          <Route>
            <Redirect to={{ pathname: '/' }} />
          </Route>
        </Switch>
      </div>
    </ProLayout>
  );
};

export default MainLayout;
