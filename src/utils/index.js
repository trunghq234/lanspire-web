import moment from 'moment';

export const converToUser = (value, idRole) => {
  const user = {
    displayName: value.displayName,
    gender: value.gender == 'male' ? 0 : value.gender == 'female' ? 1 : 2,
    dob: moment(value.dob).format('YYYY-MM-DD'),
    phoneNumber: value.phoneNumber,
    email: value.email,
    address: [value.detailsAddress, value.district, value.city],
    idRole,
    imageUrl: value.imageUrl,
    username: value.username,
    password: value.password,
    isActivated: true,
    isDeleted: false,
    idUser: value.idUser,
  };

  return user;
};
