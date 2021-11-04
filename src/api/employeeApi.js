import axiosClient from './axiosClient';

const employeeApi = {
  getAll: async () => {
    const res = await axiosClient.get('/employees');
    return res.data;
  },

  getEmployeeById: async id => {
    const res = await axiosClient.get(`/employees/${id}`);
    return res.data;
  },

  createEmployee: async employee => {
    const res = await axiosClient.post('/employees', employee);
    return res.data;
  },

  updateEmployee: async updatedEmployee => {
    const res = await axiosClient.patch(
      `/employees/${updatedEmployee.idEmployee}`,
      updatedEmployee
    );
    return res.data;
  },

  deleteEmployee: async id => {
    const res = await axiosClient.delete(`/employees/${id}`);
    return res.data;
  },
};

export default employeeApi;
