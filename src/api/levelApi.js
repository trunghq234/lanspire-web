import axiosClient from './axiosClient';

const url = '/levels/';

const levelApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async id => {
    const res = await axiosClient.get(`${url}${id}`);
    return res.data;
  },

  create: async level => {
    const res = await axiosClient.post(url, level);
    return res.data;
  },

  update: async level => {
    const res = await axiosClient.patch(`${url}${level.id}`, level);
    return res.data;
  },

  delete: async id => {
    const res = await axiosClient.delete(`${url}${id}`);
    return res.data;
  },
};

export default levelApi;
