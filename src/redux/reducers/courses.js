import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/courses';
import * as courseActions from 'redux/actions/courses';

export default function coursesReducer(state = INIT_STATE.courses, action) {
  switch (action.type) {
    //get
    case getType(courseActions.getCourses.getCoursesRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseActions.getCourses.getCoursesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseActions.getCourses.getCoursesFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(courseActions.createCourse.createCourseRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseActions.createCourse.createCourseSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseActions.createCourse.createCourseFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(courseActions.updateCourse.updateCourseRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseActions.updateCourse.updateCourseSuccess):
      return {
        ...state,
        data: state.data.map(course =>
          course.idCourse === action.payload.idCourse ? action.payload : course
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseActions.updateCourse.updateCourseFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(courseActions.deleteCourse.deleteCourseRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseActions.deleteCourse.deleteCourseSuccess):
      return {
        ...state,
        data: state.data.filter(course => course.idCourse !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseActions.deleteCourse.deleteCourseFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
