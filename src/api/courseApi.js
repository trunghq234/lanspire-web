import axiosClient from './axiosClient';

const url = '/courses/';

const courseApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idCourse => {
    const res = await axiosClient.get(`${url}${idCourse}`);
    return res.data;
  },

  create: async course => {
    const res = await axiosClient.post(url, course);
    return res.data;
  },

  update: async course => {
    const res = await axiosClient.patch(`${url}${course.idCourse}`, course);
    return res.data;
  },

  delete: async idCourse => {
    const res = await axiosClient.delete(`${url}${idCourse}`);
    return res.data;
  },
};

export default courseApi;
