import { call, put } from 'redux-saga/effects';
import courseTypeApi from 'api/courseTypeApi';
import * as courseTypeActions from 'redux/actions/courseTypes';

export function* fetchCourseTypes(action) {
  try {
    const courseType = yield call(courseTypeApi.getAll);

    yield put(courseTypeActions.getCourseTypes.getCourseTypesSuccess(courseType));
  } catch (error) {
    yield put(courseTypeActions.getCourseTypes.getCourseTypesFailure(error));
  }
}

export function* createCourseType(action) {
  try {
    const newCourseType = yield call(courseTypeApi.create, action.payload);

    yield put(courseTypeActions.createCourseType.createCourseTypeSuccess(newCourseType));
  } catch (error) {
    yield put(courseTypeActions.createCourseType.createCourseTypeFailure(error));
  }
}

export function* updateCourseType(action) {
  try {
    yield call(courseTypeApi.update, action.payload);
    yield put(courseTypeActions.updateCourseType.updateCourseTypeSuccess(action.payload));
  } catch (error) {
    yield put(courseTypeActions.updateCourseType.updateCourseTypeFailure(error));
  }
}

export function* deleteCourseType(action) {
  try {
    yield call(courseTypeApi.delete, action.payload);

    yield put(courseTypeActions.deleteCourseType.deleteCourseTypeSuccess(action.payload));
  } catch (error) {
    yield put(courseTypeActions.deleteCourseType.deleteCourseTypeFailure(error));
  }
}
