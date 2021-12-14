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
import testTypesReducer from './testType';
import examsReducer from './exam';
import billsReducer from './bills';
import parameterReducer from './parameters';
import INIT_STATE from 'redux/constant';

const appReducer = combineReducers({
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
  testTypes: testTypesReducer,
  exams: examsReducer,
  bills: billsReducer,
  parameters: parameterReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
