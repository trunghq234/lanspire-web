import { createActions } from 'redux-actions';
export const getType = reduxAction => {
  return reduxAction().type;
};

export const getUser = createActions({
  getUserRequest: payload => payload,
  getUserSuccess: payload => payload,
  getUserFailure: err => err,
});

export const getUsers = createActions({
  getUsersRequest: undefined,
  getUsersSuccess: payload => payload,
  getUsersFailure: err => err,
});

export const updateUser = createActions({
  updateUserRequest: payload => payload,
  updateUserSuccess: payload => payload,
  updateUserFailure: error => error,
});

export const createUser = createActions({
  createUserRequest: payload => payload,
  createUserSuccess: payload => payload,
  createUserFailure: error => error,
});

export const deleteUser = createActions({
  deleteUserRequest: payload => payload,
  deleteUserSuccess: payload => payload,
  deleteUserFailure: error => error,
});
