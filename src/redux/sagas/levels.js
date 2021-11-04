import { call, put } from 'redux-saga/effects';
import levelApi from 'api/levelApi';
import * as levelActions from 'redux/actions/levels';

export function* fetchLevels(action) {
  try {
    const levels = yield call(levelApi.getAll);

    yield put(levelActions.getLevels.getLevelsSuccess(levels));
  } catch (error) {
    yield put(levelActions.getLevels.getLevelsFailure(error));
  }
}

export function* createLevel(action) {
  try {
    const newLevel = yield call(levelApi.create, action.payload);

    yield put(levelActions.createLevel.createLevelSuccess(newLevel));
  } catch (error) {
    yield put(levelActions.createLevel.createLevelFailure(error));
  }
}

export function* updateLevel(action) {
  try {
    yield call(levelApi.update, action.payload);
    yield put(levelActions.updateLevel.updateLevelSuccess(action.payload));
  } catch (error) {
    yield put(levelActions.updateLevel.updateLevelFailure(error));
  }
}

export function* deleteLevel(action) {
  try {
    yield call(levelApi.delete, action.payload);

    yield put(levelActions.deleteLevel.deleteLevelSuccess(action.payload));
  } catch (error) {
    yield put(levelActions.deleteLevel.deleteLevelFailure(error));
  }
}
