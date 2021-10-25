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
