import axiosClient from './axiosClient';
const userApi = {
  getAll: async () => {
    const res = await axiosClient.get('/users');
    return res.data;
  },

  getUserById: async id => {
    const res = await axiosClient.get(`/users/${id}`);
    return res.data;
  },

  createUser: async user => {
    const res = await axiosClient.post('/useres', user);
    return res.data;
  },

  updateUser: async updatedUser => {
    const res = await axiosClient.patch(`/users/${updatedUser._id}`, updatedUser);
    return res.data;
  },

  deleteUser: async id => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data;
  },
};

export default userApi;
