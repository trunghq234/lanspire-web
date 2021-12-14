import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getClasses = createActions({
  getClassesRequest: undefined,
  getClassesSuccess: payload => payload,
  getClassesFailure: error => error,
});

export const getClass = createActions({
  getClassRequest: payload => payload,
  getClassSuccess: payload => payload,
  getClassFailure: error => error,
});

export const createClass = createActions({
  createClassRequest: payload => payload,
  createClassSuccess: payload => payload,
  createClassFailure: error => error,
});

export const updateClass = createActions({
  updateClassRequest: payload => payload,
  updateClassSuccess: payload => payload,
  updateClassFailure: error => error,
});

export const deleteClass = createActions({
  deleteClassRequest: payload => payload,
  deleteClassSuccess: payload => payload,
  deleteClassFailure: error => error,
});
