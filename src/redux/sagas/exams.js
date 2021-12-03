import { call, put } from 'redux-saga/effects';
import examApi from 'api/examApi';
import * as examActions from 'redux/actions/exams';
import { takeLatest } from 'redux-saga/effects';

export function* examSaga() {
  yield takeLatest(examActions.getExamsByClass.getExamsByClassRequest, fetchExamsByClassSaga);
  yield takeLatest(examActions.createExam.createExamRequest, createExamSaga);
  yield takeLatest(examActions.updateExam.updateExamRequest, updateExamSaga);
  yield takeLatest(examActions.deleteExam.deleteExamRequest, deleteExamSaga);
}

export function* fetchExamsByClassSaga(action) {
  try {
    const exams = yield call(examApi.getByClass, action.payload);

    yield put(examActions.getExamsByClass.getExamsByClassSuccess(exams));
  } catch (error) {
    yield put(examActions.getExamsByClass.getExamsByClassFailure(error));
  }
}

export function* createExamSaga(action) {
  try {
    const newExam = yield call(examApi.create, action.payload);

    yield put(examActions.createExam.createExamSuccess(newExam));
  } catch (error) {
    yield put(examActions.createExam.createExamFailure(error));
  }
}

export function* updateExamSaga(action) {
  try {
    const updatedExam = yield call(examApi.update, action.payload);

    yield put(examActions.updateExam.updateExamSuccess(updatedExam));
  } catch (error) {
    yield put(examActions.updateExam.updateExamFailure(error));
  }
}

export function* deleteExamSaga(action) {
  try {
    yield call(examApi.delete, action.payload);

    yield put(examActions.deleteExam.deleteExamSuccess(action.payload));
  } catch (error) {
    yield put(examActions.deleteExam.deleteExamFailure(error));
  }
}
