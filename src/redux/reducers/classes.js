import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/classes';
import * as classActions from 'redux/actions/classes';

export default function classsReducer(state = INIT_STATE.classes, action) {
  switch (action.type) {
    //get
    case getType(classActions.getClasses.getClassesRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(classActions.getClasses.getClassesSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(classActions.getClasses.getClassesFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(classActions.createClass.createClassRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(classActions.createClass.createClassSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(classActions.createClass.createClassFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(classActions.updateClass.updateClassRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(classActions.updateClass.updateClassSuccess):
      return {
        ...state,
        data: state.data.map(classroom =>
          classroom.idClass === action.payload.idClass ? action.payload : classroom
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(classActions.updateClass.updateClassFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(classActions.deleteClass.deleteClassRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(classActions.deleteClass.deleteClassSuccess):
      return {
        ...state,
        data: state.data.filter(classroom => classroom.idClass !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(classActions.deleteClass.deleteClassFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
