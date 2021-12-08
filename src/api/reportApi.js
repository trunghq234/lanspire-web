import axiosClient from './axiosClient';

const url = '/report';

const reportApi = {
  getFromTo: async (from, to) => {
    return await axiosClient.post(`${url}/revenue`, {
      from: from,
      to: to,
    });
  },

  getTopClasses: async month => {
    return await axiosClient.post(`${url}/class`, {
      month: month,
    });
  },
};

export default reportApi;
