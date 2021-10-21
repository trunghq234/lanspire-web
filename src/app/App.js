import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import Admin from './Admin';
import { adminRoutes, adminMenuItems } from 'routes/AdminRoutes';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';

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
