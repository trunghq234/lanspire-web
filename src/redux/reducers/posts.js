import INIT_STATE from '../constant';
import { getType } from '../actions/posts';
import * as postActions from '../actions/posts';

export default function postsReducer(state = INIT_STATE.posts, action) {
  switch (action.type) {
    // get Post
    case getType(postActions.getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(postActions.getPosts.getPostsSuccess):
      return {
        ...state,
        data: action.payload,
      };
    case getType(postActions.getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };

    // update Post
    case getType(postActions.updatePost.updatePostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(postActions.updatePost.updatePostSuccess):
      return {
        ...state,
        data: state.data.map(post => (post._id === action.payload._id ? action.payload : post)),
      };
    case getType(postActions.updatePost.updatePostFailure):
      return {
        ...state,
        isLoading: false,
      };

    // create Post
    case getType(postActions.createPost.createPostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(postActions.createPost.createPostSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(postActions.createPost.createPostFailure):
      return {
        ...state,
        isLoading: false,
      };

    // delete Post
    case getType(postActions.deletePost.deletePostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(postActions.deletePost.deletePostSuccess):
      return {
        ...state,
        data: state.data.filter(post => post._id !== action.payload),
      };
    case getType(postActions.deletePost.deletePostFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
