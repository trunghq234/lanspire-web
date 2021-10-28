import axiosClient from './axiosClient';

const levelApi = {
  getAll: async () => {
    const res = await axiosClient.get('/levels');
    return res.data;
  },
  getById: async id => {
    const res = await axiosClient.get(`/levels/${id}`);
    return res.data;
  },
  create: async data => {
    const res = await axiosClient.post('/levels', data);
    return res.data;
  },
  update: async data => {
    const res = await axiosClient.patch('/levels', data);
    return res.data;
  },
  remove: async id => {
    const res = await axiosClient.delete(`/levels/${id}`);
    return res.data;
  },
};

export default levelApi;
