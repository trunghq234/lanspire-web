import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { adminMenuItems, adminRoutes } from 'routes/AdminRoutes';
import Admin from './Admin';
import './App.less';

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Admin routes={adminRoutes} menuItems={adminMenuItems} />
      </Router>
    </ConfigProvider>
  );
}

export default App;
