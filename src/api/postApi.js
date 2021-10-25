import axiosClient from './axiosClient';

const postApi = {
  getAll: async () => {
    const res = await axiosClient.get('/posts');
    return res.data;
  },

  getPostById: async id => {
    const res = await axiosClient.get(`/posts/${id}`);
    return res.data;
  },

  createPost: async post => {
    const res = await axiosClient.post('/posts', post);
    return res.data;
  },

  updatePost: async updatedPost => {
    const res = await axiosClient.patch(`/posts/${updatedPost._id}`, updatedPost);
    return res.data;
  },

  deletePost: async id => {
    const res = await axiosClient.delete(`/posts/${id}`);
    return res.data;
  },
};

export default postApi;
