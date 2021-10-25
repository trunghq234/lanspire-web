import { call, put } from 'redux-saga/effects';
import authApi from '../../api/authApi';
import * as authActions from '../actions/auth';

export function* fetchAuthSaga(action) {
  try {
    const auth = yield call(authApi.loginAccount, action.payload);

    yield put(authActions.getAuth.getAuthSuccess(auth));
  } catch (error) {
    yield put(authActions.getAuth.getAuthFailure(error));
  }
}
