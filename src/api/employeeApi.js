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

  deleteEmployee: async employee => {
    const idEmployee = employee.idEmployee;
    const idUser = employee.idUser;
    const res = await axiosClient.delete(`/employees/${idEmployee}`, { data: { idUser: idUser } });
    return res.data;
  },
};

export default employeeApi;
