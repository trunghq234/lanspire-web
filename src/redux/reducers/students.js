import INIT_STATE from '../constant';
import { getType } from '../actions/posts';
import * as studentActions from '../actions/students';

export default function StudentsReducer(state = INIT_STATE.posts, action) {
  switch (action.type) {
    // get Student
    case getType(studentActions.getStudents.getStudentsRequest):
      return {
        ...state,
      };
    case getType(studentActions.getStudents.getStudentsSuccess):
      return {
        ...state,
        data: action.payload,
      };
    case getType(studentActions.getStudents.getStudentsFailure):
      return {
        ...state,
      };

    // update Student
    case getType(studentActions.updateStudents.updateStudentsRequest):
      return {
        ...state,
      };
    case getType(studentActions.updateStudents.updateStudentsSuccess):
      return {
        ...state,
        data: state.data.map(student =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case getType(studentActions.updateStudents.updateStudentsFailure):
      return {
        ...state,
      };

    default:
      return state;
  }
}
