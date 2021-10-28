import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import coursesReducer from 'redux/reducers/courses';
import courseTypesReducer from 'redux/reducers/courseType';
import levelsReducer from './level';

export default combineReducers({
  posts: postsReducer,
  employees: employesReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  levels: levelsReducer,
});
