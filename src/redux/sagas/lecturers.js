import { call, put } from 'redux-saga/effects';
import lecturerApi from '../../api/lecturerApi';
import * as lecturerActions from '../actions/lecturers';
import { takeLatest } from 'redux-saga/effects';

export function* lecturerSaga() {
  // lecturers
  yield takeLatest(lecturerActions.getLecturers.getLecturersRequest, fetchLecturersSaga);
  yield takeLatest(lecturerActions.createLecturer.createLecturerRequest, createLecturerSaga);
  yield takeLatest(lecturerActions.updateLecturer.updateLecturerRequest, updateLecturerSaga);
  yield takeLatest(lecturerActions.deleteLecturer.deleteLecturerRequest, deleteLecturerSaga);
}

function* fetchLecturersSaga(action) {
  try {
    const lecturers = yield call(lecturerApi.getAll);

    yield put(lecturerActions.getLecturers.getLecturersSuccess(lecturers));
  } catch (error) {
    yield put(lecturerActions.getLecturers.getLecturersFailure(error));
  }
}

function* updateLecturerSaga(action) {
  try {
    yield call(lecturerApi.updateLecturer, action.payload);

    yield put(lecturerActions.updateLecturer.updateLecturerSuccess(action.payload));
  } catch (error) {
    yield put(lecturerActions.updateLecturer.updateLecturerFailure(error));
  }
}

function* deleteLecturerSaga(action) {
  try {
    yield call(lecturerApi.deleteLecturer, action.payload);
    yield put(lecturerActions.deleteLecturer.deleteLecturerSuccess(action.payload));
  } catch (error) {
    yield put(lecturerActions.deleteLecturer.deleteLecturerFailure(error));
  }
}

function* createLecturerSaga(action) {
  try {
    const createdLecturer = yield call(lecturerApi.createLecturer, action.payload);

    yield put(lecturerActions.createLecturer.createLecturerSuccess(createdLecturer));
  } catch (error) {
    yield put(lecturerActions.createLecturer.createLecturerFailure(error));
  }
}
