import { combineReducers } from 'redux';
import postsReducer from './posts';
import employeesReducer from './employees';
import usersReducer from './users';
import userReducer from './user';
import authReducer from './auth';
import timeFrameReducer from './timeFrames';
import coursesReducer from 'redux/reducers/courses';
import courseTypesReducer from 'redux/reducers/courseType';
import levelsReducer from './level';
import classesReducer from './classes';
import lecturersReducer from './lecturers';

const appReducer = combineReducers({
  posts: postsReducer,
  employees: employeesReducer,
  users: usersReducer,
  user: userReducer,
  auth: authReducer,
  timeFrames: timeFrameReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  levels: levelsReducer,
  classes: classesReducer,
  lecturers: lecturersReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
