import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import usersReducer from './users';
import userReducer from './user';
import { RESET_STORE } from '../actions/actionTypes';
const appReducer = combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  users: usersReducer,
  user: userReducer,
});
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
