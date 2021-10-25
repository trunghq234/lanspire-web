import axiosClient from './axiosClient';
import authHeader from './auth-header';
const userApi = {
  getAll: async () => {
    const res = await axiosClient.get('/users', { headers: authHeader() });
    return res.data;
  },

  getUserById: async id => {
    const res = await axiosClient.get(`/users/${id}`, { headers: authHeader() });
    return res.data;
  },

  createUser: async user => {
    const res = await axiosClient.post('/useres', user, { headers: authHeader() });
    return res.data;
  },

  updateUser: async updatedUser => {
    const res = await axiosClient.patch(`/users/${updatedUser._id}`, updatedUser, {
      headers: authHeader(),
    });
    return res.data;
  },

  deleteUser: async id => {
    const res = await axiosClient.delete(`/users/${id}`, { headers: authHeader() });
    return res.data;
  },
};

export default userApi;
