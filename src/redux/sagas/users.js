import { call, put } from 'redux-saga/effects';
import userApi from '../../api/userApi';
import * as userActions from '../actions/users';

export function* fetchUsersSaga(action) {
  try {
    const users = yield call(userApi.getAll);

    yield put(userActions.getUsers.getUsersSuccess(users));
  } catch (error) {
    yield put(userActions.getUsers.getUsersFailure(error));
  }
}

export function* updateUserSaga(action) {
  try {
    yield call(userApi.updateUser, action.payload);

    yield put(userActions.updateUser.updateUserSuccess(action.payload));
  } catch (error) {
    yield put(userActions.updateUser.updateUserFailure(error));
  }
}

export function* deleteUserSaga(action) {
  try {
    yield call(userApi.deleteUser, action.payload);

    yield put(userActions.deleteUser.deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(userActions.deleteUser.deleteUserFailure(error));
  }
}

export function* createUserSaga(action) {
  try {
    const createdUser = yield call(userApi.createUser, action.payload);

    yield put(userActions.createUser.createUserSuccess(createdUser));
  } catch (error) {
    yield put(userActions.createUser.createUserFailure(error));
  }
}
