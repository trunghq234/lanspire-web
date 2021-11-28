import axiosClient from './axiosClient';

const url = '/testtypes/';

const testTypeApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getAllPromiss: () => {
    return axiosClient.get(url);
  },

  getById: async idTestType => {
    const res = await axiosClient.get(`${url}${idTestType}`);
    return res.data;
  },

  create: async testType => {
    const res = await axiosClient.post(url, testType);
    return res.data;
  },

  update: async testType => {
    const res = await axiosClient.put(`${url}${testType.idTestType}`, testType);
    return res.data;
  },

  delete: async idTestType => {
    const res = await axiosClient.delete(`${url}${idTestType}`);
    return res.data;
  },
};

export default testTypeApi;
