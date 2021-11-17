import axiosClient from './axiosClient';

const url = '/levels/';

const levelApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idLevel => {
    const res = await axiosClient.get(`${url}${idLevel}`);
    return res.data;
  },

  create: async level => {
    const res = await axiosClient.post(url, level);
    return res.data;
  },

  update: async level => {
    const res = await axiosClient.put(`${url}${level.idLevel}`, level);
    return res.data;
  },

  delete: async idLevel => {
    const res = await axiosClient.delete(`${url}${idLevel}`);
    return res.data;
  },
};

export default levelApi;
