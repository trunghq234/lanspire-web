import moment from 'moment';
import { isEmpty } from 'lodash';

export const loadFieldsValue = (value, setCity, form) => {
  const editedLecturer = {
    displayName: value.displayName,
    gender: value.gender === 0 ? 'male' : value.gender === 1 ? 'female' : 'others',
    dob: moment(value.dob),
    phoneNumber: value.phoneNumber,
    email: value.email,
    detailsAddress: value.address[0],
    district: value.address[1],
    city: value.address[2],
  };
  setCity(value.address[2]);
  form.setFieldsValue(editedLecturer);
};

export const checkUsernameIsExist = (users, username) => {
  const result = users.find(user => user.username === username);
  return !isEmpty(result);
};
