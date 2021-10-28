import axiosClient from './axiosClient';

const studentApi = {
  getAll: async () => {
    const res = await axiosClient.get('/students');
    return res.data;
  },
  getById: async id => {
    const res = await axiosClient.get(`/students/${id}`);
    return res.data;
  },
  create: async data => {
    const res = await axiosClient.post('/students', data);
    return res.data;
  },
  update: async data => {
    const res = await axiosClient.put(`/students/${data.idStudent}`, data);
    return res.data;
  },
  remove: async id => {
    const res = await axiosClient.delete(`/students/${id}`);
    return res.data;
  },
};

export default studentApi;
