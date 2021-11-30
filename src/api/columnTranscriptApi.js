import axiosClient from './axiosClient';

const url = '/columntranscripts/';

const columnTranscriptApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getAllPromiss: () => {
    return axiosClient.get(url);
  },

  getById: async idColumn => {
    const res = await axiosClient.get(`${url}${idColumn}`);
    return res.data;
  },

  create: async columnTranscript => {
    const res = await axiosClient.post(url, columnTranscript);
    return res.data;
  },

  update: async columnTranscript => {
    const res = await axiosClient.put(`${url}${columnTranscript.idColumn}`, columnTranscript);
    return res.data;
  },

  delete: async idColumn => {
    const res = await axiosClient.delete(`${url}${idColumn}`);
    return res.data;
  },
};

export default columnTranscriptApi;
