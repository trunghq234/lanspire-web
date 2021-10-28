import { call, put } from 'redux-saga/effects';
import courseTypeApi from '../../api/courseTypeApi';
import * as courseTypeActions from '../actions/courseTypes';

export function* fetchCourseTypesSaga(action) {
  try {
    const courseTypes = yield call(courseTypeApi.getAll);
    yield put(courseTypeActions.getCourseTypes.getCourseTypesSuccess(courseTypes));
  } catch (error) {
    yield put(courseTypeActions.getCourseTypes.getCourseTypesFailure(error));
  }
}
