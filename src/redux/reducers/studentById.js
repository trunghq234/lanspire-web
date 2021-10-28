import INIT_STATE from '../constant';
import { getType } from '../actions/students';
import * as studentActions from '../actions/students';

export default function StudentByIdReducer(state = INIT_STATE.studentById, action) {
  switch (action.type) {
    // get by id
    case getType(studentActions.getById.getByIdRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(studentActions.getById.getByIdSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(studentActions.getById.getByIdFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
