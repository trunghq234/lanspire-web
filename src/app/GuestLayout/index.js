import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const GuestLayout = props => {
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
    <div>
      <Switch>
        {showRoutes(props.routes)}
        <Route>
          <Redirect to={{ pathname: '/login' }} />
        </Route>
      </Switch>
    </div>
  );
};

export default GuestLayout;
