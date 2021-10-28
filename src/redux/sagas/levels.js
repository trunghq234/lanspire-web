import { call, put } from 'redux-saga/effects';
import levelApi from '../../api/levelApi';
import * as levelActions from '../actions/levels';

export function* fetchLevelsSaga(action) {
  try {
    const levels = yield call(levelApi.getAll);
    yield put(levelActions.getLevels.getLevelsSuccess(levels));
  } catch (error) {
    yield put(levelActions.getLevels.getLevelsFailure(error));
  }
}
