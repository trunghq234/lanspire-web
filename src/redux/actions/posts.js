import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: payload => payload,
  getPostsFailure: err => err,
});

export const updatePost = createActions({
  updatePostRequest: payload => payload,
  updatePostSuccess: payload => payload,
  updatePostFailure: error => error,
});

export const createPost = createActions({
  createPostRequest: payload => payload,
  createPostSuccess: payload => payload,
  createPostFailure: error => error,
});

export const deletePost = createActions({
  deletePostRequest: payload => payload,
  deletePostSuccess: payload => payload,
  deletePostFailure: error => error,
});
