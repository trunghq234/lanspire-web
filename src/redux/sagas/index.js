import { takeLatest } from 'redux-saga/effects';

import * as postActions from '../actions/posts';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from './posts';

export default function* mySaga() {
  // posts
  yield takeLatest(postActions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(postActions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(postActions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(postActions.deletePost.deletePostRequest, deletePostSaga);
}
