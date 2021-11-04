import React, { useState } from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import styles from './main.module.less';
import ProLayout from '@ant-design/pro-layout';
import logo from 'assets/images/logo.png';
import AppFooter from 'components/layout/Footer';
import RightContent from 'components/layout/RightContent';

const MainLayout = props => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const showRoutes = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.page} />;
      });
    }
    return result;
  };

  return (
    <ProLayout
      title="Lanspire"
      logo={logo}
      fixSiderbar
      fixedHeader
      layout="mix"
      contentWidth="Fluid"
      navTheme="dark"
      route={props.menuItems}
      location={{
        pathname,
      }}
      // onPageChange={param => {
      //   setPathname(param.pathname || '/');
      // }}
      headerTitleRender={(logo, title) => (
        <NavLink to="/" onClick={() => setPathname('/')}>
          {logo}
          {title}
        </NavLink>
      )}
      menuItemRender={(item, dom) => (
        <NavLink to={item.path} onClick={() => setPathname(item.path || '/')}>
          {dom}
        </NavLink>
      )}
      rightContentRender={() => <RightContent />}
      footerRender={() => <AppFooter />}
    >
      <div className={styles.container}>
        <Switch>
          {showRoutes(props.routes)}
          <Route>
            <Redirect to={{ pathname: '/' }} />
          </Route>
        </Switch>
      </div>
    </ProLayout>
  );
};

export default MainLayout;
