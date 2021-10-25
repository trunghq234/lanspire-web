import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
