import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/courses';
import * as courseActions from 'redux/actions/courses';

export default function coursesReducer(state = INIT_STATE.courses, action) {
  switch (action.getType) {
    case getType(courseActions.getCourses.getCoursesRequest):
      return {
        ...state,
      };
    case getType(courseActions.getCourses.getCoursesSuccess):
      return {
        ...state,
        data: action.payload,
      };
    case getType(courseActions.getCourses.getCoursesFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
