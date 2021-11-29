import { call, put } from 'redux-saga/effects';
import authApi from '../../api/authApi';
import * as authActions from '../actions/auth';
import { takeLatest } from 'redux-saga/effects';

export function* authSaga() {
  yield takeLatest(authActions.getAuth.getAuthRequest, fetchAuthSaga);
}

function* fetchAuthSaga(action) {
  try {
    const auth = yield call(authApi.loginAccount, action.payload);

    yield put(authActions.getAuth.getAuthSuccess(auth));
  } catch (error) {
    yield put(authActions.getAuth.getAuthFailure(error));
  }
}
