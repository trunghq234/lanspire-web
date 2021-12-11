import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import AboutUs from 'pages/AboutUs';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { adminMenuItems, adminRoutes } from 'routes/AdminRoutes';
import { employeeMenuItems, employeeRoutes } from 'routes/EmployeeRoutes';
import { guestRoutes } from 'routes/GuestRoutes';
import { lecturerMenuItems, lecturerRoutes } from 'routes/LecturerRoutes';
import './App.less';
import GuestLayout from './GuestLayout';
import MainLayout from './MainLayout';

function App() {
  const renderRoutes = () => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    console.log(process.env.REACT_APP_API_URL);
    if (token) {
      switch (role) {
        case 'lecturer':
          return <MainLayout routes={lecturerRoutes} menuItems={lecturerMenuItems} />;
        case 'employee':
          return <MainLayout routes={employeeRoutes} menuItems={employeeMenuItems} />;
        default:
          return <MainLayout routes={adminRoutes} menuItems={adminMenuItems} />;
      }
    }
    return <GuestLayout routes={guestRoutes} />;
  };

  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Switch>
          <Route path="/about" exact>
            <AboutUs />
          </Route>
          <Route path="/" render={renderRoutes} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default App;
