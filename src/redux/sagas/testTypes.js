import { call, put } from 'redux-saga/effects';
import testTypeApi from 'api/testTypeApi';
import * as testTypeActions from 'redux/actions/testTypes';
import { takeLatest } from 'redux-saga/effects';

export function* testTypeSaga() {
  yield takeLatest(testTypeActions.getTestTypes.getTestTypesRequest, fetchTestTypesSaga);
  yield takeLatest(testTypeActions.createTestType.createTestTypeRequest, createTestTypeSaga);
  yield takeLatest(testTypeActions.updateTestType.updateTestTypeRequest, updateTestTypeSaga);
  yield takeLatest(testTypeActions.deleteTestType.deleteTestTypeRequest, deleteTestTypeSaga);
}

function* fetchTestTypesSaga(action) {
  try {
    const testTypes = yield call(testTypeApi.getAll);

    yield put(testTypeActions.getTestTypes.getTestTypesSuccess(testTypes));
  } catch (error) {
    yield put(testTypeActions.getTestTypes.getTestTypesFailure(error));
  }
}

function* createTestTypeSaga(action) {
  try {
    const newTestType = yield call(testTypeApi.create, action.payload);

    yield put(testTypeActions.createTestType.createTestTypeSuccess(newTestType));
  } catch (error) {
    yield put(testTypeActions.createTestType.createTestTypeFailure(error));
  }
}

function* updateTestTypeSaga(action) {
  try {
    yield call(testTypeApi.update, action.payload);
    yield put(testTypeActions.updateTestType.updateTestTypeSuccess(action.payload));
  } catch (error) {
    yield put(testTypeActions.updateTestType.updateTestTypeFailure(error));
  }
}

function* deleteTestTypeSaga(action) {
  try {
    yield call(testTypeApi.delete, action.payload);

    yield put(testTypeActions.deleteTestType.deleteTestTypeSuccess(action.payload));
  } catch (error) {
    yield put(testTypeActions.deleteTestType.deleteTestTypeFailure(error));
  }
}
