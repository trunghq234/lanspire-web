import { call, put } from 'redux-saga/effects';
import studentApi from '../../api/studentApi';
import * as studentActions from '../actions/students';

export function* fetchStudentsSaga(action) {
  try {
    const students = yield call(studentApi.getAll);
    yield put(studentActions.getStudents.getStudentsSuccess(students));
  } catch (error) {
    yield put(studentActions.getStudents.getStudentsFailure(error));
  }
}

export function* createStudentsSaga(action) {
  try {
    const newStudent = yield call(studentApi.create, action.payload);

    yield put(studentActions.createStudents.createStudentsSuccess(newStudent));
  } catch (error) {
    yield put(studentActions.createStudents.createStudentsFailure(error));
  }
}

export function* updateStudentsSaga(action) {
  try {
    yield call(studentApi.update, action.payload);

    yield put(studentActions.updateStudents.updateStudentsSuccess(action.payload));
  } catch (error) {
    yield put(studentActions.updateStudents.updatesStudentsFailure(error));
  }
}

export function* deleteStudentsSaga(action) {
  try {
    yield call(studentApi.remove, action.payload);
    yield put(studentActions.deleteStudents.deleteStudentsSuccess(action.payload));
  } catch (error) {
    yield put(studentActions.deleteStudents.deleteStudentsFailure(error));
  }
}

export function* getStudentByIdSaga(action) {
  try {
    const student = yield call(studentApi.getById, action.payload);
    yield put(studentActions.getById.getByIdSuccess(student));
  } catch (error) {
    yield put(studentActions.getById.getByIdFailure(error));
  }
}
