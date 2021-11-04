import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import StudentsReducer from './students';
import LevelsReducer from './level';
import CourseTypesReducer from './courseTypes';
import StudentByIdReducer from './studentById';
import usersReducer from './users';
import userReducer from './user';
import authReducer from './auth';
const appReducer = combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  users: usersReducer,
  user: userReducer,
  auth: authReducer,
  students: StudentsReducer,
  levels: LevelsReducer,
  courseTypes: CourseTypesReducer,
  studentById: StudentByIdReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
