import axiosClient from './axiosClient';

const url = '/parameters/';

const parameterApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idParameter => {
    const res = await axiosClient.get(`${url}${idParameter}`);
    return res.data;
  },

  create: async parameter => {
    const res = await axiosClient.post(url, parameter);
    return res.data;
  },

  update: async parameters => {
    const res = await axiosClient.patch(`${url}`, parameters);
    return res.data;
  },

  delete: async idParameter => {
    const res = await axiosClient.delete(`${url}${idParameter}`);
    return res.data;
  },
};

export default parameterApi;
