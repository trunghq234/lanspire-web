import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

function getPublicContent() {
  return axios.get(API_URL + 'login');
}

function getAdminBoard() {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
}

export const AccountService = {
  getPublicContent,
  getAdminBoard,
};
