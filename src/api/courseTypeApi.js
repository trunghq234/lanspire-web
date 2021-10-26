import axiosClient from './axiosClient';

const url = '/coursetypes/';

const courseTypeApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async id => {
    const res = await axiosClient.get(`${url}${id}`);
    return res.data;
  },

  create: async courseType => {
    const res = await axiosClient.post(url, courseType);
    return res.data;
  },

  update: async courseType => {
    const res = await axiosClient.patch(`${url}${courseType.id}`, courseType);
    return res.data;
  },

  delete: async id => {
    const res = await axiosClient.delete(`${url}${id}`);
    return res.data;
  },
};

export default courseTypeApi;
