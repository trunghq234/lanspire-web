import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import StudentsReducer from './students';
import LevelsReducer from './level';
import CourseTypesReducer from './courseTypes';
import StudentByIdReducer from './studentById';

export default combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  students: StudentsReducer,
  levels: LevelsReducer,
  courseTypes: CourseTypesReducer,
  studentById: StudentByIdReducer,
});
