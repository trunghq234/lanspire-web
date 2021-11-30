import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/exams';
import * as examActions from 'redux/actions/exams';

export default function examsReducer(state = INIT_STATE.exams, action) {
  switch (action.type) {
    //get
    case getType(examActions.getExamsByClass.getExamsByClassRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(examActions.getExamsByClass.getExamsByClassSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(examActions.getExamsByClass.getExamsByClassFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(examActions.createExam.createExamRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(examActions.createExam.createExamSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(examActions.createExam.createExamFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(examActions.updateExam.updateExamRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(examActions.updateExam.updateExamSuccess):
      return {
        ...state,
        data: state.data.map(exam =>
          exam.idExam === action.payload.idExam ? action.payload : exam
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(examActions.updateExam.updateExamFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(examActions.deleteExam.deleteExamRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(examActions.deleteExam.deleteExamSuccess):
      return {
        ...state,
        data: state.data.filter(exam => exam.idExam !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(examActions.deleteExam.deleteExamFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
