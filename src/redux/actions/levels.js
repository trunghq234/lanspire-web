import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getLevels = createActions({
  getLevelsRequest: undefined,
  getLevelsSuccess: payload => payload,
  getLevelsFailure: error => error,
});

export const createLevel = createActions({
  createLevelRequest: payload => payload,
  createLevelSuccess: payload => payload,
  createLevelFailure: error => error,
});

export const updateLevel = createActions({
  updateLevelRequest: payload => payload,
  updateLevelSuccess: payload => payload,
  updateLevelFailure: error => error,
});

export const deleteLevel = createActions({
  deleteLevelRequest: payload => payload,
  deleteLevelSuccess: payload => payload,
  deleteLevelFailure: error => error,
});
