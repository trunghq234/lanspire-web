import axiosClient from './axiosClient';

const billApi = {
  getAll: async () => {
    const res = await axiosClient.get('/bills');
    return res.data;
  },
  getById: idBill => {
    return axiosClient.get(`/bills/${idBill}`);
  },
  create: async data => {
    const res = await axiosClient.post('/bills', data);
    return res.data;
  },
  update: async data => {
    const res = await axiosClient.patch(`/bills/${data.idBill}`, data);
    return res.data;
  },
  remove: async id => {
    const res = await axiosClient.delete(`/bills/${id}`);
    return res.data;
  },
};

export default billApi;
