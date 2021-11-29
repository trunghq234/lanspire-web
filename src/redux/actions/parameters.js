import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

const getParameters = createActions({
  getParametersRequest: undefined,
  getParametersSuccess: payload => payload,
  getParametersFailure: payload => payload,
});

const createParameter = createActions({
  createParameterRequest: payload => payload,
  createParameterSuccess: payload => payload,
  createParameterFailure: payload => payload,
});

const updateParameter = createActions({
  updateParameterRequest: payload => payload,
  updateParameterSuccess: payload => payload,
  updateParameterFailure: payload => payload,
});

const deleteParameter = createActions({
  deleteParameterRequest: payload => payload,
  deleteParameterSuccess: payload => payload,
  deleteParameterFailure: payload => payload,
});
export { getParameters, createParameter, deleteParameter, updateParameter };
