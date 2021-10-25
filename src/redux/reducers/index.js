import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import StudentsReducer from './students';

export default combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  students: StudentsReducer,
});
