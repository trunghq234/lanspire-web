import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getCourses = createActions({
  getCoursesRequest: undefined,
  getCoursesSuccess: payload => payload,
  getCoursesFailure: err => err,
});
