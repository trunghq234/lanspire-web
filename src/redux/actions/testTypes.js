import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getTestTypes = createActions({
  getTestTypesRequest: undefined,
  getTestTypesSuccess: payload => payload,
  getTestTypesFailure: error => error,
});

export const createTestType = createActions({
  createTestTypeRequest: payload => payload,
  createTestTypeSuccess: payload => payload,
  createTestTypeFailure: error => error,
});

export const updateTestType = createActions({
  updateTestTypeRequest: payload => payload,
  updateTestTypeSuccess: payload => payload,
  updateTestTypeFailure: error => error,
});

export const deleteTestType = createActions({
  deleteTestTypeRequest: payload => payload,
  deleteTestTypeSuccess: payload => payload,
  deleteTestTypeFailure: error => error,
});
