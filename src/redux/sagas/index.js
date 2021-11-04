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
import * as userActions from '../actions/users';
import { fetchAuthSaga } from './auth';
import { createClass, deleteClass, fetchClasses, updateClass } from './classes';
import { createPostSaga, deletePostSaga, fetchPostsSaga, updatePostSaga } from './posts';
import {
  createUserSaga,
  deleteUserSaga,
  fetchUserSaga,
  fetchUsersSaga,
  updateUserSaga,
} from './users';

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
  // users
  yield takeLatest(userActions.getUsers.getUsersRequest, fetchUsersSaga);
  yield takeLatest(userActions.getUser.getUserRequest, fetchUserSaga);
  yield takeLatest(userActions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(userActions.updateUser.updateUserRequest, updateUserSaga);
  yield takeLatest(userActions.deleteUser.deleteUserRequest, deleteUserSaga);
  //auth
  yield takeLatest(authActions.getAuth.getAuthRequest, fetchAuthSaga);
  //classes
  yield takeLatest(classActions.getClasses.getClassesRequest, fetchClasses);
  yield takeLatest(classActions.createClass.createClassRequest, createClass);
  yield takeLatest(classActions.updateClass.updateClassRequest, updateClass);
  yield takeLatest(classActions.deleteClass.deleteClassRequest, deleteClass);
}
