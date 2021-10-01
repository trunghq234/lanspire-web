import './App.less';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import { adminRoutes } from 'routes/AdminRoutes';

function App() {
  return (
    <Router>
      <AdminRoutes routes={adminRoutes} />
    </Router>
  );
}

export default App;
