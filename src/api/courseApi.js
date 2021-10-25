import axiosClient from './axiosClient';

const courseApi = {
  getAll: async () => {
    const url = 'courses';
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default courseApi;
