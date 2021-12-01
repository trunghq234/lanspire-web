import axiosClient from './axiosClient';

const url = '/exams/';

const examApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idExam => {
    const res = await axiosClient.get(`${url}${idExam}`);
    return res.data;
  },

  getByClass: async idClass => {
    const res = await axiosClient.get(`${url}class/${idClass}`);
    return res.data;
  },

  getByIdClass: idClass => {
    return axiosClient.get(`${url}class/${idClass}`);
  },

  create: async exam => {
    const res = await axiosClient.post(url, exam);
    return res.data;
  },

  update: async exam => {
    const res = await axiosClient.patch(`${url}${exam.idExam}`, exam);
    return res.data;
  },

  delete: async idExam => {
    const res = await axiosClient.delete(`${url}${idExam}`);
    return res.data;
  },
};

export default examApi;
