import { call, put } from 'redux-saga/effects';
import timeFrameApi from 'api/timeFrameApi';
import * as timeFrameActions from '../actions/timeFrames';
import { takeLatest } from 'redux-saga/effects';

export function* timeFrameSaga() {
  yield takeLatest(timeFrameActions.getAllTimeFrames.getAllTimeFramesRequest, fetchTimeFramesSaga);
  yield takeLatest(timeFrameActions.getByIdTimeFrame.getByIdTimeFrameRequest, fetchTimeFrameSaga);
  yield takeLatest(timeFrameActions.createTimeFrame.createTimeFrameRequest, createTimeFrameSaga);
  yield takeLatest(timeFrameActions.updateTimeFrame.updateTimeFrameRequest, updateTimeFrameSaga);
  yield takeLatest(timeFrameActions.updateTimeFrames.updateTimeFramesRequest, updateTimeFramesSaga);
  yield takeLatest(timeFrameActions.deleteTimeFrame.deleteTimeFrameRequest, deleteTimeFrameSaga);
}

function* fetchTimeFramesSaga(action) {
  try {
    const timeFrames = yield call(timeFrameApi.getAll);
    yield put(timeFrameActions.getAllTimeFrames.getAllTimeFramesSuccess(timeFrames));
  } catch (error) {
    yield put(timeFrameActions.getAllTimeFrames.getAllTimeFramesFailure(error));
  }
}
function* fetchTimeFrameSaga(action) {
  try {
    const timeFrame = yield call(timeFrameApi.getById, action.payload);

    yield put(timeFrameActions.getByIdTimeFrame.getByIdTimeFrameSuccess(timeFrame));
  } catch (error) {
    yield put(timeFrameActions.getByIdTimeFrame.getByIdTimeFrameFailure(error));
  }
}

function* updateTimeFrameSaga(action) {
  try {
    const data = yield call(timeFrameApi.update, action.payload);
    yield put(timeFrameActions.updateTimeFrame.updateTimeFrameSuccess(data));
  } catch (error) {
    yield put(timeFrameActions.updateTimeFrame.updateTimeFrameFailure(error));
  }
}

function* updateTimeFramesSaga(action) {
  try {
    const data = yield call(timeFrameApi.updateAll, action.payload);
    yield put(timeFrameActions.updateTimeFrames.updateTimeFramesSuccess(data));
  } catch (error) {
    yield put(timeFrameActions.updateTimeFrames.updateTimeFramesFailure(error));
  }
}

function* deleteTimeFrameSaga(action) {
  try {
    yield call(timeFrameApi.delete, action.payload);

    yield put(timeFrameActions.deleteTimeFrame.deleteTimeFrameSuccess(action.payload));
  } catch (error) {
    yield put(timeFrameActions.deleteTimeFrame.deleteTimeFrameFailure(error));
  }
}

function* createTimeFrameSaga(action) {
  try {
    const timeFrame = yield call(timeFrameApi.create, action.payload);
    yield put(timeFrameActions.createTimeFrame.createTimeFrameSuccess(timeFrame));
  } catch (error) {
    yield put(timeFrameActions.createTimeFrame.createTimeFrameFailure(error));
  }
}
