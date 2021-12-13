import { call, put } from 'redux-saga/effects';
import classApi from 'api/classApi';
import * as classActions from 'redux/actions/classes';
import { takeLatest } from 'redux-saga/effects';

export function* classSaga() {
  yield takeLatest(classActions.getClasses.getClassesRequest, fetchClasses);
  yield takeLatest(classActions.createClass.createClassRequest, createClass);
  yield takeLatest(classActions.updateClass.updateClassRequest, updateClass);
  yield takeLatest(classActions.deleteClass.deleteClassRequest, deleteClass);
}

function* fetchClasses(action) {
  try {
    const classes = yield call(classApi.getAll);

    yield put(classActions.getClasses.getClassesSuccess(classes));
  } catch (error) {
    yield put(classActions.getClasses.getClassesFailure(error));
  }
}

function* fetchClass(action) {
  try {
    const classRoom = yield call(classApi.getById, action.payload);

    yield put(classActions.getClasses.getClassSuccess(classRoom));
  } catch (error) {
    yield put(classActions.getClasses.getClassFailure(error));
  }
}

function* createClass(action) {
  try {
    const newClass = yield call(classApi.create, action.payload);

    yield put(classActions.createClass.createClassSuccess(newClass));
  } catch (error) {
    yield put(classActions.createClass.createClassFailure(error));
  }
}

function* updateClass(action) {
  try {
    yield call(classApi.update, action.payload);
    yield put(classActions.updateClass.updateClassSuccess(action.payload));
  } catch (error) {
    yield put(classActions.updateClass.updateClassFailure(error));
  }
}

function* deleteClass(action) {
  try {
    yield call(classApi.delete, action.payload);

    yield put(classActions.deleteClass.deleteClassSuccess(action.payload));
  } catch (error) {
    yield put(classActions.deleteClass.deleteClassFailure(error));
  }
}
