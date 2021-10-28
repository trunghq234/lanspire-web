import INIT_STATE from '../constant';
import { getType } from '../actions/students';
import * as studentActions from '../actions/students';

export default function StudentsReducer(state = INIT_STATE.students, action) {
  switch (action.type) {
    // get Students
    case getType(studentActions.getStudents.getStudentsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(studentActions.getStudents.getStudentsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(studentActions.getStudents.getStudentsFailure):
      return {
        ...state,
        isLoading: false,
      };
    //create student
    case getType(studentActions.createStudents.createStudentsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(studentActions.createStudents.createStudentsSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
      };
    case getType(studentActions.createStudents.createStudentsFailure):
      return {
        ...state,
      };

    // update Student
    case getType(studentActions.updateStudents.updateStudentsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(studentActions.updateStudents.updateStudentsSuccess):
      return {
        ...state,
        data: state.data.map(student =>
          student.idStudent === action.payload.idStudent ? action.payload : student
        ),
        isLoading: false,
      };
    case getType(studentActions.updateStudents.updateStudentsFailure):
      return {
        ...state,
        isLoading: false,
      };

    //delete student
    case getType(studentActions.deleteStudents.deleteStudentsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(studentActions.deleteStudents.deleteStudentsSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(student => student.idStudent !== action.payload),
      };
    case getType(studentActions.deleteStudents.deleteStudentsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
