import moment from 'moment';
import { isEmpty } from 'lodash';

export const loadFieldsValue = (value, setCity, form) => {
  const editedLecturer = {
    displayName: value.User.displayName,
    gender: value.User.gender === 0 ? 'male' : value.User.gender === 1 ? 'female' : 'others',
    dob: moment(value.User.dob),
    phoneNumber: value.User.phoneNumber,
    email: value.User.email,
    detailsAddress: value.User.address[0],
    district: value.User.address[1],
    city: value.User.address[2],
  };
  setCity(value.User.address[2]);
  form.setFieldsValue(editedLecturer);
};

export const checkUsernameIsExist = (users, username) => {
  const result = users.find(user => user.username === username);
  return !isEmpty(result);
};
