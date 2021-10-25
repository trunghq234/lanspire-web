import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getPosts } from 'redux/actions/posts';
import { userState$ } from 'redux/selectors';
import { adminMenuItems, adminRoutes } from 'routes/AdminRoutes';
import { guestRoutes } from 'routes/GuestRoutes';
import Admin from './Admin';
import './App.less';
import Guest from './Guest';
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPosts.getPostsRequest());
  }, [dispatch]);
  const user = useSelector(userState$);
  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Route
          path="/"
          render={() => {
            return user.accessToken ? (
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
