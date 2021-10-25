import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import coursesReducer from 'redux/reducers/courses';

export default combineReducers({
  postsReducer,
  employesReducer,
  coursesReducer,
});
