import axiosClient from './axiosClient';

const employeeApi = {
  getAll: async () => {
    const res = await axiosClient.get('/employes');
    return res.data;
  },

  getEmployeeById: async id => {
    const res = await axiosClient.get(`/employes/${id}`);
    return res.data;
  },

  createEmployee: async employee => {
    const res = await axiosClient.post('/employes', employee);
    return res.data;
  },

  updateEmployee: async updatedEmployee => {
    const res = await axiosClient.patch(`/employes/${updatedEmployee._id}`, updatedEmployee);
    return res.data;
  },

  deleteEmployee: async id => {
    const res = await axiosClient.delete(`/employes/${id}`);
    return res.data;
  },
};

export default employeeApi;
