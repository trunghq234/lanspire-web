import { combineReducers } from 'redux';
import employesReducer from './employes';
import lecturersReducer from './lecturers';
import usersReducer from './users';

export default combineReducers({
  employes: employesReducer,
  lecturers: lecturersReducer,
  users: usersReducer,
});
