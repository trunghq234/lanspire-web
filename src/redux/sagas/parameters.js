import { call, put } from 'redux-saga/effects';
import parameterApi from 'api/parameterApi';
import * as parameterActions from 'redux/actions/parameters';

export function* fetchParameters(action) {
  try {
    const parameters = yield call(parameterApi.getAll);

    yield put(parameterActions.getParameters.getParametersSuccess(parameters));
  } catch (error) {
    yield put(parameterActions.getParameters.getParametersFailure(error));
  }
}

export function* createParameter(action) {
  try {
    const newParameter = yield call(parameterApi.create, action.payload);

    yield put(parameterActions.createParameter.createParameterSuccess(newParameter));
  } catch (error) {
    yield put(parameterActions.createParameter.createParameterFailure(error));
  }
}

export function* updateParameter(action) {
  try {
    yield call(parameterApi.update, action.payload);
    yield put(parameterActions.updateParameter.updateParameterSuccess(action.payload));
  } catch (error) {
    yield put(parameterActions.updateParameter.updateParameterFailure(error));
  }
}

export function* deleteParameter(action) {
  try {
    yield call(parameterApi.delete, action.payload);

    yield put(parameterActions.deleteParameter.deleteParameterSuccess(action.payload));
  } catch (error) {
    yield put(parameterActions.deleteParameter.deleteParameterFailure(error));
  }
}
