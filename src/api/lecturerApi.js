import axiosClient from './axiosClient';

const lecturerApi = {
  getAll: async () => {
    const res = await axiosClient.get('/lecturers');
    return res.data;
  },

  getLecturerById: async id => {
    const res = await axiosClient.get(`/lecturers/${id}`);
    return res.data;
  },

  createLecturer: async lecturer => {
    const res = await axiosClient.post('/lecturers', lecturer);
    return res.data;
  },

  updateLecturer: async updatedLecturer => {
    const res = await axiosClient.patch(`/lecturers/${updatedLecturer.id}`, updatedLecturer);
    return res.data;
  },

  deleteLecturer: async lecturer => {
    const idLecturer = lecturer.idLecturer;
    const idUser = lecturer.idUser;
    const res = await axiosClient.delete(`/lecturers/${idLecturer}`, { data: { idUser: idUser } });
    return res.data;
  },
};

export default lecturerApi;
