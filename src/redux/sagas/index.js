import { takeLatest } from 'redux-saga/effects';
import * as postActions from 'redux/actions/posts';
import * as courseActions from 'redux/actions/courses';
import * as courseTypeActions from 'redux/actions/coursesType';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from 'redux/sagas/posts';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from 'redux/sagas/courses';
import {
  fetchCourseTypes,
  createCourseType,
  updateCourseType,
  deleteCourseType,
} from 'redux/sagas/courseTypes';

export default function* mySaga() {
  //courses
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
}
