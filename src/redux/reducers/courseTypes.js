import INIT_STATE from '../constant';
import { getType } from '../actions/courseTypes';
import * as courseTypeActions from '../actions/courseTypes';

export default function CourseTypesReducer(state = INIT_STATE.courseTypes, action) {
  switch (action.type) {
    // get Level
    case getType(courseTypeActions.getCourseTypes.getCourseTypesRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(courseTypeActions.getCourseTypes.getCourseTypesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(courseTypeActions.getCourseTypes.getCourseTypesFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
