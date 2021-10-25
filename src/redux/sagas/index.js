import { takeLatest } from 'redux-saga/effects';
import * as postActions from '../actions/posts';
import * as courseActions from '../actions/courses';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from './posts';
import { fetchCourses } from './courses';

export default function* mySaga() {
  //courses
  yield takeLatest(courseActions.getCourses.getCoursesRequest, fetchCourses);

  // posts
  yield takeLatest(postActions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(postActions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(postActions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(postActions.deletePost.deletePostRequest, deletePostSaga);
}
