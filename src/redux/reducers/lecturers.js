import INIT_STATE from '../constant';
import { getType } from '../actions/lecturers';
import * as lecturerActions from '../actions/lecturers';

export default function lecturersReducer(state = INIT_STATE.lecturers, action) {
  switch (action.type) {
    // get Lecturer
    case getType(lecturerActions.getLecturers.getLecturersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(lecturerActions.getLecturers.getLecturersSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(lecturerActions.getLecturers.getLecturersFailure):
      return {
        ...state,
        isLoading: false,
      };

    // update Lecturer
    case getType(lecturerActions.updateLecturer.updateLecturerRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(lecturerActions.updateLecturer.updateLecturerSuccess):
      return {
        ...state,
        data: state.data.map(lecturer =>
          lecturer.idLecturer === action.payload.idLecturer ? action.payload : lecturer
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(lecturerActions.updateLecturer.updateLecturerFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    // create Lecturer
    case getType(lecturerActions.createLecturer.createLecturerRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(lecturerActions.createLecturer.createLecturerSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(lecturerActions.createLecturer.createLecturerFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    // delete Lecturer
    case getType(lecturerActions.deleteLecturer.deleteLecturerRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(lecturerActions.deleteLecturer.deleteLecturerSuccess):
      return {
        ...state,
        data: state.data.map(lecturer => {
          const idLecturer = action.payload.idLecturer;
          if (lecturer.idLecturer === idLecturer) {
            lecturer.User.isActivated = false;
            lecturer.isDeleted = true;
          }
          return lecturer;
        }),
        isLoading: false,
        isSuccess: true,
      };
    case getType(lecturerActions.deleteLecturer.deleteLecturerFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
