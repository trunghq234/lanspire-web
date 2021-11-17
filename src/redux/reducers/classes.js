import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/classes';
import * as classActions from 'redux/actions/classes';

export default function classsReducer(state = INIT_STATE.classes, action) {
  switch (action.type) {
    //get all
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
    // get one
    case getType(classActions.getClass.getClassRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(classActions.getClass.getClassSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(classActions.getClass.getClassFailure):
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
        data: state.data.map(classRoom => {
          if (classRoom.idClass === action.payload.idClass) {
            if (action.payload.idLecturer) {
              classRoom.Lecturers = classRoom.Lecturers.filter(
                lecturer => lecturer.idLecturer != action.payload.idLecturer
              );
              return classRoom;
            } else {
              return action.payload;
            }
          } else {
            return classRoom;
          }
        }),
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
