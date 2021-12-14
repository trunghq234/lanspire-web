import { call, put } from 'redux-saga/effects';
import levelApi from 'api/levelApi';
import * as levelActions from 'redux/actions/levels';
import { takeLatest } from 'redux-saga/effects';

export function* levelSaga() {
  yield takeLatest(levelActions.getLevels.getLevelsRequest, fetchLevels);
  yield takeLatest(levelActions.createLevel.createLevelRequest, createLevel);
  yield takeLatest(levelActions.updateLevel.updateLevelRequest, updateLevel);
  yield takeLatest(levelActions.deleteLevel.deleteLevelRequest, deleteLevel);
}

function* fetchLevels(action) {
  try {
    const levels = yield call(levelApi.getAll);

    yield put(levelActions.getLevels.getLevelsSuccess(levels));
  } catch (error) {
    yield put(levelActions.getLevels.getLevelsFailure(error));
  }
}

function* createLevel(action) {
  try {
    const newLevel = yield call(levelApi.create, action.payload);

    yield put(levelActions.createLevel.createLevelSuccess(newLevel));
  } catch (error) {
    yield put(levelActions.createLevel.createLevelFailure(error));
  }
}

function* updateLevel(action) {
  try {
    yield call(levelApi.update, action.payload);
    yield put(levelActions.updateLevel.updateLevelSuccess(action.payload));
  } catch (error) {
    yield put(levelActions.updateLevel.updateLevelFailure(error));
  }
}

function* deleteLevel(action) {
  try {
    yield call(levelApi.delete, action.payload);

    yield put(levelActions.deleteLevel.deleteLevelSuccess(action.payload));
  } catch (error) {
    yield put(levelActions.deleteLevel.deleteLevelFailure(error));
  }
}
