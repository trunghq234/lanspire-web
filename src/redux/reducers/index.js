import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import usersReducer from './users';
import userReducer from './user';
import authReducer from './auth';
import timeFrameReducer from './timeFrames';
const appReducer = combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  users: usersReducer,
  user: userReducer,
  auth: authReducer,
  timeFrames: timeFrameReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
