import { call, put } from 'redux-saga/effects';
import classApi from 'api/classApi';
import * as classActions from 'redux/actions/classes';

export function* fetchClasses(action) {
  try {
    const classes = yield call(classApi.getAll);

    yield put(classActions.getClasses.getClassesSuccess(classes));
  } catch (error) {
    yield put(classActions.getClasses.getClassesFailure(error));
  }
}

export function* createClass(action) {
  try {
    const newClass = yield call(classApi.create, action.payload);

    yield put(classActions.createClass.createClassSuccess(newClass));
  } catch (error) {
    yield put(classActions.createClass.createClassFailure(error));
  }
}

export function* updateClass(action) {
  try {
    yield call(classApi.update, action.payload);
    yield put(classActions.updateClass.updateClassSuccess(action.payload));
  } catch (error) {
    yield put(classActions.updateClass.updateClassFailure(error));
  }
}

export function* deleteClass(action) {
  try {
    yield call(classApi.delete, action.payload);

    yield put(classActions.deleteClass.deleteClassSuccess(action.payload));
  } catch (error) {
    yield put(classActions.deleteClass.deleteClassFailure(error));
  }
}
