import INIT_STATE from '../constant';
import { getType } from '../actions/users';
import * as userActions from '../actions/users';

export default function usersReducer(state = INIT_STATE.users, action) {
  switch (action.type) {
    //get Users
    case getType(userActions.getUsers.getUsersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(userActions.getUsers.getUsersSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(userActions.getUsers.getUsersFailure):
      return {
        ...state,
        isLoading: false,
      };

    // update User
    case getType(userActions.updateUser.updateUserRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(userActions.updateUser.updateUserSuccess):
      return {
        ...state,
        data: state.data.map(user =>
          user.idUser === action.payload.idUser ? action.payload : user
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(userActions.updateUser.updateUserFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    // create Employee
    case getType(userActions.createUser.createUserRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(userActions.createUser.createUserSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(userActions.createUser.createUserFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    // delete Employee
    case getType(userActions.deleteUser.deleteUserRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(userActions.deleteUser.deleteUserSuccess):
      return {
        ...state,
        data: state.data.filter(user => user.idUser !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(userActions.deleteUser.deleteUserFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
