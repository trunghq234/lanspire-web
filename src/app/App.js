import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import Admin from './Admin';
import { adminRoutes, adminMenuItems } from 'routes/AdminRoutes';

function App() {
  return (
    <Router>
      <Admin routes={adminRoutes} menuItems={adminMenuItems} />
    </Router>
  );
}

export default App;
