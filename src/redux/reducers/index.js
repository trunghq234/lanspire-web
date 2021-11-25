import { combineReducers } from 'redux';
import employeesReducer from './employees';
import studentsReducer from './students';
import usersReducer from './users';
import userReducer from './user';
import authReducer from './auth';
import timeFrameReducer from './timeFrames';
import coursesReducer from 'redux/reducers/courses';
import courseTypesReducer from 'redux/reducers/courseType';
import levelsReducer from './level';
import columnTranscriptsReducer from './columnTranscript';
import classesReducer from './classes';
import lecturersReducer from './lecturers';
import billsReducer from './bills';

export default combineReducers({
  employees: employeesReducer,
  users: usersReducer,
  user: userReducer,
  auth: authReducer,
  students: studentsReducer,
  timeFrames: timeFrameReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  levels: levelsReducer,
  columnTranscripts: columnTranscriptsReducer,
  classes: classesReducer,
  lecturers: lecturersReducer,
  bills: billsReducer,
});
