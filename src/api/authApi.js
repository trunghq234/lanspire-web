import axiosClient from './axiosClient';

const authApi = {
  loginAccount: async user => {
    return await axiosClient.post('auth/signin', {
      user,
    });
  },
};
export default authApi;
