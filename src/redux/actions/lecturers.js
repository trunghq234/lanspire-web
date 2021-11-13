import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getLecturers = createActions({
  getLecturersRequest: undefined,
  getLecturersSuccess: payload => payload,
  getLecturersFailure: err => err,
});

export const updateLecturer = createActions({
  updateLecturerRequest: payload => payload,
  updateLecturerSuccess: payload => payload,
  updateLecturerFailure: error => error,
});

export const createLecturer = createActions({
  createLecturerRequest: payload => payload,
  createLecturerSuccess: payload => payload,
  createLecturerFailure: error => error,
});

export const deleteLecturer = createActions({
  deleteLecturerRequest: payload => payload,
  deleteLecturerSuccess: payload => payload,
  deleteLecturerFailure: error => error,
});
