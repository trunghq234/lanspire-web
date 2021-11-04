import { call, put } from 'redux-saga/effects';
import courseApi from 'api/courseApi';
import * as courseActions from 'redux/actions/courses';

export function* fetchCourses(action) {
  try {
    const courses = yield call(courseApi.getAll);

    yield put(courseActions.getCourses.getCoursesSuccess(courses));
  } catch (error) {
    yield put(courseActions.getCourses.getCoursesFailure(error));
  }
}

export function* createCourse(action) {
  try {
    const newCourse = yield call(courseApi.create, action.payload);

    yield put(courseActions.createCourse.createCourseSuccess(newCourse));
  } catch (error) {
    yield put(courseActions.createCourse.createCourseFailure(error));
  }
}

export function* updateCourse(action) {
  try {
    yield call(courseApi.update, action.payload);
    yield put(courseActions.updateCourse.updateCourseSuccess(action.payload));
  } catch (error) {
    yield put(courseActions.updateCourse.updateCourseFailure(error));
  }
}

export function* deleteCourse(action) {
  try {
    yield call(courseApi.delete, action.payload);

    yield put(courseActions.deleteCourse.deleteCourseSuccess(action.payload));
  } catch (error) {
    yield put(courseActions.deleteCourse.deleteCourseFailure(error));
  }
}
