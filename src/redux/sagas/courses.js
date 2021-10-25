import { call, put } from '@redux-saga/core/effects';
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
