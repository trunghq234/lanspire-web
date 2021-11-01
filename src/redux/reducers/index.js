import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import usersReducer from './users';
import userReducer from './user';
import authReducer from './auth';
import coursesReducer from 'redux/reducers/courses';
import courseTypesReducer from 'redux/reducers/courseType';
import levelsReducer from './level';
const appReducer = combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  users: usersReducer,
  user: userReducer,
  auth: authReducer,
  employees: employesReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  levels: levelsReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
