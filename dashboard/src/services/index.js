// Aqui definimos a "camada de serviço", onde vamos comunicar com o backend
import axios from 'axios';
import AuthService from './auth';

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
};

const httpClient = axios.create({
  baseURL: API_ENVS.local
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    const canThrowAnError = (error.request.status =
      0 || error.request.status === 500);

    if (canThrowAnError) {
      throw new Error(error.message);
    }
    return error;
  }
);
export default {
  auth: AuthService(httpClient)
};
