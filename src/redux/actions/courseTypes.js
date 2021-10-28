import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getCourseTypes = createActions({
  getCourseTypesRequest: undefined,
  getCourseTypesSuccess: payload => payload,
  getCourseTypesFailure: error => error,
});

export const updateCourseType = createActions({
  updateCourseTypeRequest: payload => payload,
  updateCourseTypeSuccess: payload => payload,
  updateCourseTypeFailure: error => error,
});

export const createCourseType = createActions({
  createCourseTypeRequest: payload => payload,
  createCourseTypeSuccess: payload => payload,
  createCourseTypeFailure: error => error,
});

export const deleteCourseType = createActions({
  deleteCourseTypeRequest: payload => payload,
  deleteCourseTypeSuccess: payload => payload,
  deleteCourseTypeFailure: error => error,
});
