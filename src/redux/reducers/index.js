import { combineReducers } from 'redux';
import postsReducer from './posts';
import employesReducer from './employes';
import StudentsReducer from './students';
import StudentByIdReducer from './studentById';
import usersReducer from './users';
import userReducer from './user';
import authReducer from './auth';
import timeFrameReducer from './timeFrames';
import coursesReducer from 'redux/reducers/courses';
import courseTypesReducer from 'redux/reducers/courseType';
import levelsReducer from './level';
import columnTranscriptsReducer from './columnTranscript';
import classesReducer from './classes';

export default combineReducers({
  posts: postsReducer,
  employes: employesReducer,
  users: usersReducer,
  user: userReducer,
  auth: authReducer,
  students: StudentsReducer,
  studentById: StudentByIdReducer,
  timeFrames: timeFrameReducer,
  employees: employesReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  levels: levelsReducer,
  columnTranscripts: columnTranscriptsReducer,
  classes: classesReducer,
});
