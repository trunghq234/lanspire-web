import INIT_STATE from '../constant';
import { getType } from '../actions/users';
import * as userActions from '../actions/users';

export default function userReducer(state = INIT_STATE.user, action) {
  switch (action.type) {
    // get User
    case getType(userActions.getUser.getUserRequest):
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case getType(userActions.getUser.getUserSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(userActions.getUser.getUserFailure):
      return {
        ...state,
        isLoading: false,
      };
  }
  return state;
}
