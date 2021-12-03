import { call, put } from 'redux-saga/effects';
import courseApi from 'api/courseApi';
import * as courseActions from 'redux/actions/courses';
import { takeLatest } from 'redux-saga/effects';

export function* courseSaga() {
  yield takeLatest(courseActions.getCourses.getCoursesRequest, fetchCourses);
  yield takeLatest(courseActions.createCourse.createCourseRequest, createCourse);
  yield takeLatest(courseActions.updateCourse.updateCourseRequest, updateCourse);
  yield takeLatest(courseActions.deleteCourse.deleteCourseRequest, deleteCourse);
}

function* fetchCourses(action) {
  try {
    const courses = yield call(courseApi.getAll);

    yield put(courseActions.getCourses.getCoursesSuccess(courses));
  } catch (error) {
    yield put(courseActions.getCourses.getCoursesFailure(error));
  }
}

function* createCourse(action) {
  try {
    const newCourse = yield call(courseApi.create, action.payload);

    yield put(courseActions.createCourse.createCourseSuccess(newCourse));
  } catch (error) {
    yield put(courseActions.createCourse.createCourseFailure(error));
  }
}

function* updateCourse(action) {
  try {
    yield call(courseApi.update, action.payload);
    yield put(courseActions.updateCourse.updateCourseSuccess(action.payload));
  } catch (error) {
    yield put(courseActions.updateCourse.updateCourseFailure(error));
  }
}

function* deleteCourse(action) {
  try {
    yield call(courseApi.delete, action.payload);

    yield put(courseActions.deleteCourse.deleteCourseSuccess(action.payload));
  } catch (error) {
    yield put(courseActions.deleteCourse.deleteCourseFailure(error));
  }
}
