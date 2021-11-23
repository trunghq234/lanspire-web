import axiosClient from './axiosClient';
const url = '/exams/';

const examApi = {
  getByIdClass: async idClass => {
    return await axiosClient.get(`${url}classes/${idClass}`);
  },
};

export default examApi;
