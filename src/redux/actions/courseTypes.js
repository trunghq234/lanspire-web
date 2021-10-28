import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getCourseTypes = createActions({
  getCourseTypesRequest: undefined,
  getCourseTypesSuccess: payload => payload,
  getCourseTypesFailure: err => err,
});
