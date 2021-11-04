import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/courseTypes';
import * as courseTypeActions from 'redux/actions/courseTypes';

export default function courseTypesReducer(state = INIT_STATE.courseTypes, action) {
  switch (action.type) {
    //get
    case getType(courseTypeActions.getCourseTypes.getCourseTypesRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseTypeActions.getCourseTypes.getCourseTypesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseTypeActions.getCourseTypes.getCourseTypesFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(courseTypeActions.createCourseType.createCourseTypeRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseTypeActions.createCourseType.createCourseTypeSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseTypeActions.createCourseType.createCourseTypeFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(courseTypeActions.updateCourseType.updateCourseTypeRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseTypeActions.updateCourseType.updateCourseTypeSuccess):
      return {
        ...state,
        data: state.data.map(courseType =>
          courseType.idCourseType === action.payload.idCourseType ? action.payload : courseType
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseTypeActions.updateCourseType.updateCourseTypeFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(courseTypeActions.deleteCourseType.deleteCourseTypeRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(courseTypeActions.deleteCourseType.deleteCourseTypeSuccess):
      return {
        ...state,
        data: state.data.filter(courseType => courseType.idCourseType !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(courseTypeActions.deleteCourseType.deleteCourseTypeFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
