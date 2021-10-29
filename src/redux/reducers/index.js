import { combineReducers } from 'redux';
import coursesReducer from './courses';
import employesReducer from './employes';
import lecturersReducer from './lecturers';

export default combineReducers({
  employes: employesReducer,
  courses: coursesReducer,
  lecturers: lecturersReducer,
});
