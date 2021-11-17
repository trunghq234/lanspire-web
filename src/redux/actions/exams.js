import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getExamsByClass = createActions({
  getExamsByClassRequest: undefined,
  getExamsByClassSuccess: payload => payload,
  getExamsByClassFailure: error => error,
});

export const createExam = createActions({
  createExamRequest: payload => payload,
  createExamSuccess: payload => payload,
  createExamFailure: error => error,
});

export const updateExam = createActions({
  updateExamRequest: payload => payload,
  updateExamSuccess: payload => payload,
  updateExamFailure: error => error,
});

export const deleteExam = createActions({
  deleteExamRequest: payload => payload,
  deleteExamSuccess: payload => payload,
  deleteExamFailure: error => error,
});
