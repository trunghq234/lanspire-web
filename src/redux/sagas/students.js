import { call, put } from 'redux-saga/effects';
import studentApi from '../../api/studentApi';
import * as studentActions from '../actions/students';
import { takeLatest } from 'redux-saga/effects';

export function* studentSaga() {
  yield takeLatest(studentActions.getStudents.getStudentsRequest, fetchStudentsSaga);
  yield takeLatest(studentActions.createStudents.createStudentsRequest, createStudentsSaga);
  yield takeLatest(studentActions.updateStudents.updateStudentsRequest, updateStudentsSaga);
  yield takeLatest(studentActions.deleteStudents.deleteStudentsRequest, deleteStudentsSaga);
  yield takeLatest(studentActions.getById.getByIdRequest, getStudentByIdSaga);
}

function* fetchStudentsSaga(action) {
  try {
    const students = yield call(studentApi.getAll);
    yield put(studentActions.getStudents.getStudentsSuccess(students));
  } catch (error) {
    yield put(studentActions.getStudents.getStudentsFailure(error));
  }
}

function* createStudentsSaga(action) {
  try {
    const newStudent = yield call(studentApi.create, action.payload);

    yield put(studentActions.createStudents.createStudentsSuccess(newStudent));
  } catch (error) {
    yield put(studentActions.createStudents.createStudentsFailure(error));
  }
}

function* updateStudentsSaga(action) {
  try {
    yield call(studentApi.update, action.payload);

    yield put(studentActions.updateStudents.updateStudentsSuccess(action.payload));
  } catch (error) {
    yield put(studentActions.updateStudents.updatesStudentsFailure(error));
  }
}

function* deleteStudentsSaga(action) {
  try {
    yield call(studentApi.remove, action.payload);
    yield put(studentActions.deleteStudents.deleteStudentsSuccess(action.payload));
  } catch (error) {
    yield put(studentActions.deleteStudents.deleteStudentsFailure(error));
  }
}

function* getStudentByIdSaga(action) {
  try {
    const student = yield call(studentApi.getById, action.payload);
    yield put(studentActions.getById.getByIdSuccess(student));
  } catch (error) {
    yield put(studentActions.getById.getByIdFailure(error));
  }
}
