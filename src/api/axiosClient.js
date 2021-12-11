import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/signin' && err.response) {
      // Access Token was expired

      if (err.response.status === 401) {
        originalConfig._retry = true;

        try {
          const rs = await axiosClient.post('/auth/refreshtoken', {
            refreshToken: localStorage.getItem('refreshToken'),
          });

          const { accessToken } = rs.data;

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
          }
          window.location = '/';

          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      // Refresh Token was expired
      if (err.response.status === 403) {
        alert('Your session has been expired. Please log in again!');
        localStorage.clear();
        window.location = '/login';
      }
      if (err.response.status === 404) {
        alert('Confirm code has been expired or incorrect. Please send request again!');
        window.location = '/forgot-password';
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
