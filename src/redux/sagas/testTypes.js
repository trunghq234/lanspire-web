import { call, put } from 'redux-saga/effects';
import testTypeApi from 'api/testTypeApi';
import * as testTypeActions from 'redux/actions/testTypes';

export function* fetchTestTypes(action) {
  try {
    const testTypes = yield call(testTypeApi.getAll);

    yield put(testTypeActions.getTestTypes.getTestTypesSuccess(testTypes));
  } catch (error) {
    yield put(testTypeActions.getTestTypes.getTestTypesFailure(error));
  }
}

export function* createTestType(action) {
  try {
    const newTestType = yield call(testTypeApi.create, action.payload);

    yield put(testTypeActions.createTestType.createTestTypeSuccess(newTestType));
  } catch (error) {
    yield put(testTypeActions.createTestType.createTestTypeFailure(error));
  }
}

export function* updateTestType(action) {
  try {
    yield call(testTypeApi.update, action.payload);
    yield put(testTypeActions.updateTestType.updateTestTypeSuccess(action.payload));
  } catch (error) {
    yield put(testTypeActions.updateTestType.updateTestTypeFailure(error));
  }
}

export function* deleteTestType(action) {
  try {
    yield call(testTypeApi.delete, action.payload);

    yield put(testTypeActions.deleteTestType.deleteTestTypeSuccess(action.payload));
  } catch (error) {
    yield put(testTypeActions.deleteTestType.deleteTestTypeFailure(error));
  }
}
