import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as postActions from '../actions/posts';
import * as studentActions from '../actions/students';
import * as levelActions from 'redux/actions/levels';
import * as courseTypeActions from 'redux/actions/courseTypes';
import { fetchLevelsSaga } from './levels';
import { fetchCourseTypesSaga } from './courseTypes';

import * as userActions from '../actions/users';
import * as authActions from '../actions/auth';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from './posts';
import {
  fetchStudentsSaga,
  createStudentsSaga,
  updateStudentsSaga,
  deleteStudentsSaga,
  getStudentByIdSaga,
} from './students';
import {
  fetchUsersSaga,
  fetchUserSaga,
  updateUserSaga,
  deleteUserSaga,
  createUserSaga,
} from './users';
import { fetchAuthSaga } from './auth';
export default function* mySaga() {
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

  //Levels
  yield takeLatest(levelActions.getLevels.getLevelsRequest, fetchLevelsSaga);
  //Course type
  yield takeLatest(courseTypeActions.getCourseTypes.getCourseTypesRequest, fetchCourseTypesSaga);
  // users
  yield takeLatest(userActions.getUsers.getUsersRequest, fetchUsersSaga);
  yield takeLatest(userActions.getUser.getUserRequest, fetchUserSaga);
  yield takeLatest(userActions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(userActions.updateUser.updateUserRequest, updateUserSaga);
  yield takeLatest(userActions.deleteUser.deleteUserRequest, deleteUserSaga);
  //auth
  yield takeLatest(authActions.getAuth.getAuthRequest, fetchAuthSaga);
}
