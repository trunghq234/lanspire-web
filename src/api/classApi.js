import axiosClient from './axiosClient';

const url = '/classes/';

const classApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: idClass => {
    return axiosClient.get(`${url}${idClass}`);
  },

  getByIdCourse: idCoure => {
    return axiosClient.get(`${url}course/${idCoure}`);
  },

  create: async classRoom => {
    const res = await axiosClient.post(url, classRoom);
    return res.data;
  },

  update: async classRoom => {
    const res = await axiosClient.put(`${url}${classRoom.idClass}`, classRoom);
    return res.data;
  },

  delete: async idClass => {
    const res = await axiosClient.delete(`${url}${idClass}`);
    return res.data;
  },
};

export default classApi;
