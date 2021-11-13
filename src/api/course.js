import axiosClient from './axiosClient';

const courseApi = {
  getAll: async () => {
    const res = await axiosClient.get('/courses');
    return res.data;
  },
};

export default courseApi;
