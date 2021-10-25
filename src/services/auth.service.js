import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

export const loginAccount = async user => {
  const response = await axios.post(API_URL + 'signin', {
    user,
  });
  console.log(response.data);
  return response.data;
};

export const logoutAccount = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
