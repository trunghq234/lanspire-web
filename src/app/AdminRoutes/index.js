import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from 'app/MainLayout';

const AdminRoutes = ({ routes }) => {
  const showRoutes = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.page} />;
      });
    }
    return result;
  };

  return <MainLayout routes={showRoutes(routes)} />;
};

export default AdminRoutes;
