import axiosClient from './axiosClient';
const url = '/exams/';

const examApi = {
  getByIdClass: async idClass => {
    return await axiosClient.post(url + 'findByIdClass', { idClass: idClass });
  },
};

export default examApi;
