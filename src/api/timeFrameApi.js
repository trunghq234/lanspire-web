import { async } from 'q';
import { sync } from 'resolve';
import axiosClient from './axiosClient';

const timeFrameApi = {
  getAll: async () => {
    const res = await axiosClient.get('/timeFrames');
    return res.data;
  },
  getById: async id => {
    const res = await axiosClient.get(`/timeFrames/${id}`);
    return res.data;
  },
  create: async data => {
    const res = await axiosClient.post('/timeFrames', data);
    return res.data;
  },
  update: async data => {
    const res = await axiosClient.patch(`/timeFrames/${data.idTimeFrame}`, data);
    return res.data;
  },
  updateAll: async data => {
    const res = await axiosClient.patch(`/timeFrames/`, data);
    return res.data;
  },
  delete: async id => {
    const res = await axiosClient.delete(`/timeFrames/${id}`);
    return res.data;
  },
};

export default timeFrameApi;
