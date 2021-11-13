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
        error: '',
        isSuccess: false,
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
        error: action.payload.message,
        isLoading: false,
      };
    //create student
    case getType(studentActions.createStudents.createStudentsRequest):
      return {
        ...state,
        error: '',
        isLoading: true,
        isSuccess: false,
      };
    case getType(studentActions.createStudents.createStudentsSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(studentActions.createStudents.createStudentsFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };

    // update Student
    case getType(studentActions.updateStudents.updateStudentsRequest):
      return {
        ...state,
        error: '',
        isLoading: true,
        isSuccess: false,
      };
    case getType(studentActions.updateStudents.updateStudentsSuccess):
      return {
        ...state,
        data: state.data.map(student =>
          student.idStudent === action.payload.idStudent ? action.payload : student
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(studentActions.updateStudents.updateStudentsFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };

    //delete student
    case getType(studentActions.deleteStudents.deleteStudentsRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: '',
      };
    case getType(studentActions.deleteStudents.deleteStudentsSuccess):
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: state.data.map(student => {
          if (student.idStudent === action.payload) {
            return {
              ...student,
              isDeleted: true,
            };
          } else return student;
        }),
      };
    case getType(studentActions.deleteStudents.deleteStudentsFailure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
}
