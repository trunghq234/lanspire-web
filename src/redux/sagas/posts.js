import { call, put } from 'redux-saga/effects';
import postApi from '../../api/postApi';
import * as postActions from '../actions/posts';

export function* fetchPostsSaga(action) {
  try {
    const posts = yield call(postApi.getAll);

    yield put(postActions.getPosts.getPostsSuccess(posts));
  } catch (error) {
    yield put(postActions.getPosts.getPostsFailure(error));
  }
}

export function* updatePostSaga(action) {
  try {
    yield call(postApi.updatePost, action.payload);
    yield put(postActions.updatePost.updatePostSuccess(action.payload));
  } catch (error) {
    yield put(postActions.updatePost.updatePostFailure(error));
  }
}

export function* deletePostSaga(action) {
  try {
    yield call(postApi.deletePost, action.payload);

    yield put(postActions.deletePost.deletePostSuccess(action.payload));
  } catch (error) {
    yield put(postActions.deletePost.deletePostFailure(error));
  }
}

export function* createPostSaga(action) {
  try {
    const newPost = yield call(postApi.createPost, action.payload);
    yield put(postActions.createPost.createPostSuccess(newPost));
  } catch (error) {
    yield put(postActions.deletePost.createPostFailure(error));
  }
}
