import { takeLatest } from 'redux-saga/effects';
import * as courseActions from 'redux/actions/courses';
import * as courseTypeActions from 'redux/actions/courseTypes';
import * as levelActions from 'redux/actions/levels';
import { createCourse, deleteCourse, fetchCourses, updateCourse } from 'redux/sagas/courses';
import {
  createCourseType,
  deleteCourseType,
  fetchCourseTypes,
  updateCourseType,
} from 'redux/sagas/courseTypes';
import { createLevel, deleteLevel, fetchLevels, updateLevel } from 'redux/sagas/levels';
import * as authActions from '../actions/auth';
import * as classActions from '../actions/classes';
import * as postActions from '../actions/posts';
import * as studentActions from '../actions/students';

import * as userActions from '../actions/users';
import * as timeFrameActions from '../actions/timeFrames';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from './posts';
import { fetchAuthSaga } from './auth';
import { createClass, deleteClass, fetchClasses, updateClass } from './classes';
import {
  fetchStudentsSaga,
  createStudentsSaga,
  updateStudentsSaga,
  deleteStudentsSaga,
  getStudentByIdSaga,
} from './students';
import {
  fetchUsersSaga,
  createUserSaga,
  deleteUserSaga,
  fetchUserSaga,
  updateUserSaga,
} from './users';
import {
  createTimeFrameSaga,
  deleteTimeFrameSaga,
  fetchTimeFrameSaga,
  fetchTimeFramesSaga,
  updateTimeFrameSaga,
} from './timeFrames';

export default function* mySaga() {
  //level
  yield takeLatest(levelActions.getLevels.getLevelsRequest, fetchLevels);
  yield takeLatest(levelActions.createLevel.createLevelRequest, createLevel);
  yield takeLatest(levelActions.updateLevel.updateLevelRequest, updateLevel);
  yield takeLatest(levelActions.deleteLevel.deleteLevelRequest, deleteLevel);

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

  // posts
  yield takeLatest(postActions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(postActions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(postActions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(postActions.deletePost.deletePostRequest, deletePostSaga);

  //students
  yield takeLatest(studentActions.getStudents.getStudentsRequest, fetchStudentsSaga);
  yield takeLatest(studentActions.createStudents.createStudentsRequest, createStudentsSaga);
  yield takeLatest(studentActions.updateStudents.updateStudentsRequest, updateStudentsSaga);
  yield takeLatest(studentActions.deleteStudents.deleteStudentsRequest, deleteStudentsSaga);
  yield takeLatest(studentActions.getById.getByIdRequest, getStudentByIdSaga);

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
  yield takeLatest(timeFrameActions.deleteTimeFrame.deleteTimeFrameRequest, deleteTimeFrameSaga);
  //classes
  yield takeLatest(classActions.getClasses.getClassesRequest, fetchClasses);
  yield takeLatest(classActions.createClass.createClassRequest, createClass);
  yield takeLatest(classActions.updateClass.updateClassRequest, updateClass);
  yield takeLatest(classActions.deleteClass.deleteClassRequest, deleteClass);
}
