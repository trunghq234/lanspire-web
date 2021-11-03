import { combineReducers } from 'redux';
import employeesReducer from './employees';
import lecturersReducer from './lecturers';
import usersReducer from './users';

export default combineReducers({
  employees: employeesReducer,
  lecturers: lecturersReducer,
  users: usersReducer,
});
