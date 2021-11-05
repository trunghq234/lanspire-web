import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getStudents = createActions({
  getStudentsRequest: undefined,
  getStudentsSuccess: payload => payload,
  getStudentsFailure: err => err,
});

export const createStudents = createActions({
  createStudentsRequest: payload => payload,
  createStudentsSuccess: payload => payload,
  createStudentsFailure: err => err,
});

export const updateStudents = createActions({
  updateStudentsRequest: payload => payload,
  updateStudentsSuccess: payload => payload,
  updateStudentsFailure: err => err,
});

export const deleteStudents = createActions({
  deleteStudentsRequest: payload => payload,
  deleteStudentsSuccess: payload => payload,
  deleteStudentsFailure: err => err,
});

export const getById = createActions({
  getByIdRequest: payload => payload,
  getByIdSuccess: payload => payload,
  getByIdFailure: err => err,
});
