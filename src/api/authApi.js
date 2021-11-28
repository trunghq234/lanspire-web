import axiosClient from './axiosClient';

const authApi = {
  loginAccount: async user => {
    return await axiosClient.post('auth/signin', {
      user,
    });
  },
  resetEmail: async username => {
    return await axiosClient.post('auth/send-mail', {
      username,
    });
  },
  updatePassword: data => {
    return axiosClient.post('auth/reset-password', data);
  },
};
export default authApi;
