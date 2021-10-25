import { getConfirmLocale } from 'antd/lib/modal/locale';
import axiosClient from './axiosClient';

const studentApi = {
  getAll() {
    const url = '/students';
    return axiosClient.get(url);
  },
  get(id) {},
  create(data) {},
  update(data) {},
  remove(id) {},
};

export default studentApi;
