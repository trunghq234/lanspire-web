import { call, put } from 'redux-saga/effects';
import lecturerApi from '../../api/lecturerApi';
import * as lecturerActions from '../actions/lecturers';

export function* fetchLecturersSaga(action) {
  try {
    const lecturers = yield call(lecturerApi.getAll);

    yield put(lecturerActions.getLecturers.getLecturersSuccess(lecturers));
  } catch (error) {
    yield put(lecturerActions.getLecturers.getLecturersFailure(error));
  }
}

export function* updateLecturerSaga(action) {
  try {
    yield call(lecturerApi.updateLecturer, action.payload);

    yield put(lecturerActions.updateLecturer.updateLecturerSuccess(action.payload));
  } catch (error) {
    yield put(lecturerActions.updateLecturer.updateLecturerFailure(error));
  }
}

export function* deleteLecturerSaga(action) {
  try {
    yield call(lecturerApi.deleteLecturer, action.payload);
    yield put(lecturerActions.deleteLecturer.deleteLecturerSuccess(action.payload));
  } catch (error) {
    yield put(lecturerActions.deleteLecturer.deleteLecturerFailure(error));
  }
}

export function* createLecturerSaga(action) {
  try {
    const createdLecturer = yield call(lecturerApi.createLecturer, action.payload);

    yield put(lecturerActions.createLecturer.createLecturerSuccess(createdLecturer));
  } catch (error) {
    yield put(lecturerActions.createLecturer.createLecturerFailure(error));
  }
}
