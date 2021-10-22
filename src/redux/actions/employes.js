import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getEmployes = createActions({
  getEmployesRequest: undefined,
  getEmployesSuccess: payload => payload,
  getEmployesFailure: err => err,
});

export const updateEmployee = createActions({
  updateEmployeeRequest: payload => payload,
  updateEmployeeSuccess: payload => payload,
  updateEmployeeFailure: error => error,
});

export const createEmployee = createActions({
  createEmployeeRequest: payload => payload,
  createEmployeeSuccess: payload => payload,
  createEmployeeFailure: error => error,
});

export const deleteEmployee = createActions({
  deleteEmployeeRequest: payload => payload,
  deleteEmployeeSuccess: payload => payload,
  deleteEmployeeFailure: error => error,
});
