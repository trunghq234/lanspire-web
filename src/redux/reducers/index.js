import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';

export default combineReducers({
  posts: postsReducer,
  employes: employesReducer,
});
