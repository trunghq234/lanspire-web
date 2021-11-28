import { takeLatest } from 'redux-saga/effects';
import * as columnTranscriptActions from 'redux/actions/columnTranscripts';
import * as courseActions from 'redux/actions/courses';
import * as courseTypeActions from 'redux/actions/courseTypes';
import * as levelActions from 'redux/actions/levels';
import * as billActions from 'redux/actions/bills';
import * as authActions from '../actions/auth';
import * as classActions from '../actions/classes';
import * as employeeActions from '../actions/employees';
import * as lecturerActions from '../actions/lecturers';
import * as studentActions from '../actions/students';
import * as timeFrameActions from '../actions/timeFrames';
import * as userActions from '../actions/users';
import * as parameterActions from '../actions/parameters';
import {
  createColumnTranscript,
  deleteColumnTranscript,
  fetchColumnTranscripts,
  updateColumnTranscript,
} from 'redux/sagas/columnTranscripts';
import { createCourse, deleteCourse, fetchCourses, updateCourse } from 'redux/sagas/courses';
import {
  createCourseType,
  deleteCourseType,
  fetchCourseTypes,
  updateCourseType,
} from 'redux/sagas/courseTypes';
import { createLevel, deleteLevel, fetchLevels, updateLevel } from 'redux/sagas/levels';
import * as testTypeActions from 'redux/actions/testTypes';
import * as examActions from 'redux/actions/exams';
import {
  createParameter,
  deleteParameter,
  fetchParameters,
  updateParameter,
} from 'redux/sagas/parameters';

import { fetchAuthSaga } from './auth';
import { createClass, deleteClass, fetchClasses, updateClass } from './classes';
import {
  createEmployeeSaga,
  deleteEmployeeSaga,
  fetchEmployeesSaga,
  updateEmployeeSaga,
} from './employees';
import {
  createLecturerSaga,
  deleteLecturerSaga,
  fetchLecturersSaga,
  updateLecturerSaga,
} from './lecturers';
import {
  createStudentsSaga,
  deleteStudentsSaga,
  fetchStudentsSaga,
  updateStudentsSaga,
} from './students';
import {
  createTimeFrameSaga,
  deleteTimeFrameSaga,
  fetchTimeFrameSaga,
  fetchTimeFramesSaga,
  updateTimeFrameSaga,
  updateTimeFramesSaga,
} from './timeFrames';
import {
  createUserSaga,
  deleteUserSaga,
  fetchUserSaga,
  fetchUsersSaga,
  updateUserSaga,
} from './users';
import { createTestType, fetchTestTypes, updateTestType, deleteTestType } from './testTypes';
import { createExam, updateExam, deleteExam, fetchExamsByClass } from './exams';
import { createBillSaga, deleteBillSaga, fetchBillsSaga, updateBillSaga } from './bills';

export default function* mySaga() {
  //column transcript
  yield takeLatest(
    columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsRequest,
    fetchColumnTranscripts
  );
  yield takeLatest(
    columnTranscriptActions.createColumnTranscript.createColumnTranscriptRequest,
    createColumnTranscript
  );
  yield takeLatest(
    columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptRequest,
    updateColumnTranscript
  );
  yield takeLatest(
    columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptRequest,
    deleteColumnTranscript
  );

  //level
  yield takeLatest(levelActions.getLevels.getLevelsRequest, fetchLevels);
  yield takeLatest(levelActions.createLevel.createLevelRequest, createLevel);
  yield takeLatest(levelActions.updateLevel.updateLevelRequest, updateLevel);
  yield takeLatest(levelActions.deleteLevel.deleteLevelRequest, deleteLevel);

  //parameter
  yield takeLatest(parameterActions.getParameters.getParametersRequest, fetchParameters);
  yield takeLatest(parameterActions.createParameter.createParameterRequest, createParameter);
  yield takeLatest(parameterActions.updateParameter.updateParameterRequest, updateParameter);
  yield takeLatest(parameterActions.deleteParameter.deleteParameterRequest, deleteParameter);

  //course types
  yield takeLatest(courseTypeActions.getCourseTypes.getCourseTypesRequest, fetchCourseTypes);
  yield takeLatest(courseTypeActions.createCourseType.createCourseTypeRequest, createCourseType);
  yield takeLatest(courseTypeActions.updateCourseType.updateCourseTypeRequest, updateCourseType);
  yield takeLatest(courseTypeActions.deleteCourseType.deleteCourseTypeRequest, deleteCourseType);

  //courses
  yield takeLatest(courseActions.getCourses.getCoursesRequest, fetchCourses);
  yield takeLatest(courseActions.createCourse.createCourseRequest, createCourse);
  yield takeLatest(courseActions.updateCourse.updateCourseRequest, updateCourse);
  yield takeLatest(courseActions.deleteCourse.deleteCourseRequest, deleteCourse);

  //students
  yield takeLatest(studentActions.getStudents.getStudentsRequest, fetchStudentsSaga);
  yield takeLatest(studentActions.createStudents.createStudentsRequest, createStudentsSaga);
  yield takeLatest(studentActions.updateStudents.updateStudentsRequest, updateStudentsSaga);
  yield takeLatest(studentActions.deleteStudents.deleteStudentsRequest, deleteStudentsSaga);

  // users
  yield takeLatest(userActions.getUsers.getUsersRequest, fetchUsersSaga);
  yield takeLatest(userActions.getUser.getUserRequest, fetchUserSaga);
  yield takeLatest(userActions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(userActions.updateUser.updateUserRequest, updateUserSaga);
  yield takeLatest(userActions.deleteUser.deleteUserRequest, deleteUserSaga);
  //auth
  yield takeLatest(authActions.getAuth.getAuthRequest, fetchAuthSaga);
  //Time Frame
  yield takeLatest(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest, fetchTimeFramesSaga);
  yield takeLatest(timeFrameActions.getByIdTimeFrame.getByIdTimeFrameRequest, fetchTimeFrameSaga);
  yield takeLatest(timeFrameActions.createTimeFrame.createTimeFrameRequest, createTimeFrameSaga);
  yield takeLatest(timeFrameActions.updateTimeFrame.updateTimeFrameRequest, updateTimeFrameSaga);
  yield takeLatest(timeFrameActions.updateTimeFrames.updateTimeFramesRequest, updateTimeFramesSaga);
  yield takeLatest(timeFrameActions.deleteTimeFrame.deleteTimeFrameRequest, deleteTimeFrameSaga);
  //classes
  yield takeLatest(classActions.getClasses.getClassesRequest, fetchClasses);
  yield takeLatest(classActions.createClass.createClassRequest, createClass);
  yield takeLatest(classActions.updateClass.updateClassRequest, updateClass);
  yield takeLatest(classActions.deleteClass.deleteClassRequest, deleteClass);
  // employees
  yield takeLatest(employeeActions.getEmployees.getEmployeesRequest, fetchEmployeesSaga);
  yield takeLatest(employeeActions.createEmployee.createEmployeeRequest, createEmployeeSaga);
  yield takeLatest(employeeActions.updateEmployee.updateEmployeeRequest, updateEmployeeSaga);
  yield takeLatest(employeeActions.deleteEmployee.deleteEmployeeRequest, deleteEmployeeSaga);

  // lecturers
  yield takeLatest(lecturerActions.getLecturers.getLecturersRequest, fetchLecturersSaga);
  yield takeLatest(lecturerActions.createLecturer.createLecturerRequest, createLecturerSaga);
  yield takeLatest(lecturerActions.updateLecturer.updateLecturerRequest, updateLecturerSaga);
  yield takeLatest(lecturerActions.deleteLecturer.deleteLecturerRequest, deleteLecturerSaga);

  // Test types
  yield takeLatest(testTypeActions.getTestTypes.getTestTypesRequest, fetchTestTypes);
  yield takeLatest(testTypeActions.createTestType.createTestTypeRequest, createTestType);
  yield takeLatest(testTypeActions.updateTestType.updateTestTypeRequest, updateTestType);
  yield takeLatest(testTypeActions.deleteTestType.deleteTestTypeRequest, deleteTestType);

  // Exams
  yield takeLatest(examActions.getExamsByClass.getExamsByClassRequest, fetchExamsByClass);
  yield takeLatest(examActions.createExam.createExamRequest, createExam);
  yield takeLatest(examActions.updateExam.updateExamRequest, updateExam);
  yield takeLatest(examActions.deleteExam.deleteExamRequest, deleteExam);
  //bills
  yield takeLatest(billActions.getBills.getBillsRequest, fetchBillsSaga);
  yield takeLatest(billActions.createBill.createBillRequest, createBillSaga);
  yield takeLatest(billActions.updateBill.updateBillRequest, updateBillSaga);
  yield takeLatest(billActions.deleteBill.deleteBillRequest, deleteBillSaga);
}
