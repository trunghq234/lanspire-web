import axiosClient from './axiosClient';

const url = '/coursetypes/';

const courseTypeApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idCourseType => {
    const res = await axiosClient.get(`${url}${idCourseType}`);
    return res.data;
  },

  create: async courseType => {
    const res = await axiosClient.post(url, courseType);
    return res.data;
  },

  update: async courseType => {
    const res = await axiosClient.put(`${url}${courseType.idCourseType}`, courseType);
    return res.data;
  },

  delete: async idCourseType => {
    const res = await axiosClient.delete(`${url}${idCourseType}`);
    return res.data;
  },
};

export default courseTypeApi;
