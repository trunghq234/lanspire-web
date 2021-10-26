import INIT_STATE from '../constant';
import { getType } from '../actions/auth';
import * as authActions from '../actions/auth';
import { REFRESH_TOKEN } from '../actions/actionTypes';
export default function authReducer(state = INIT_STATE.auth, action) {
  switch (action.type) {
    // get User
    case getType(authActions.getAuth.getAuthRequest):
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case getType(authActions.getAuth.getAuthSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(authActions.getAuth.getAuthFailure):
      return {
        ...state,
        isLoading: false,
      };
  }
  return state;
}
