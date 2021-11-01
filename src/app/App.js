import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { adminMenuItems, adminRoutes } from 'routes/AdminRoutes';
import { guestRoutes } from 'routes/GuestRoutes';
import Admin from './Admin';
import './App.less';
import Guest from './Guest';
function App() {
  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Route
          path="/"
          render={() => {
            return localStorage.getItem('accessToken') ? (
              <Admin routes={adminRoutes} menuItems={adminMenuItems} />
            ) : (
              <Guest routes={guestRoutes} />
            );
          }}
        />
      </Router>
    </ConfigProvider>
  );
}

export default App;
