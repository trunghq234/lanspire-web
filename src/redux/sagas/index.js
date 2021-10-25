import { takeLatest } from 'redux-saga/effects';

import * as postActions from '../actions/posts';
import * as studentActions from '../actions/students';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from './posts';
import { fetchStudentsSaga } from './students';

export default function* mySaga() {
  // posts
  yield takeLatest(postActions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(postActions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(postActions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(postActions.deletePost.deletePostRequest, deletePostSaga);

  //students
  yield takeLatest(studentActions.getStudents.getStudentsRequest, fetchStudentsSaga);
  // yield takeLatest(studentActions.createPost.createPostRequest, createPostSaga);
  // yield takeLatest(studentActions.updatePost.updatePostRequest, updatePostSaga);
  // yield takeLatest(studentActions.deletePost.deletePostRequest, deletePostSaga);
}
