import axiosClient from './axiosClient';

const courseTypeApi = {
  getAll: async () => {
    const res = await axiosClient.get('/courseTypes');
    return res.data;
  },
};

export default courseTypeApi;
