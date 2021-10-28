import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getLevels = createActions({
  getLevelsRequest: undefined,
  getLevelsSuccess: payload => payload,
  getLevelsFailure: err => err,
});

export const createLevels = createActions({
  createLevelsRequest: payload => payload,
  createLevelsSuccess: payload => payload,
  createLevelsFailure: err => err,
});

export const updateLevels = createActions({
  updateLevelsRequest: payload => payload,
  updateLevelsSuccess: payload => payload,
  updateLevelsFailure: err => err,
});

export const deleteLevels = createActions({
  deleteLevelsRequest: payload => payload,
  deleteLevelsSuccess: payload => payload,
  deleteLevelsFailure: err => err,
});
