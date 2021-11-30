// Aqui definimos a "camada de serviço", onde vamos comunicar com o backend
import axios from 'axios';
import router from '../router';
import { setGlobalLoading } from '../store/global';
import AuthService from './auth';
import UserService from './user';
import FeedbackService from './feedbacks';

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
};

const httpClient = axios.create({
  baseURL: API_ENVS.local
});

// Aqui, vamo interceptar as configurações que serão enviadas nos Requests
httpClient.interceptors.request.use(config => {
  setGlobalLoading(true);
  // 1. Acesso o token salvo em local storage após o login do usuário
  const token = window.localStorage.getItem('token');
  // 2. Verifico se o Token existe
  if (token) {
    // 2.1 Caso o token exista, altero os headers do meu request, passando o Bearer Token
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  // 3. Retorno minha config, fazendo com que ela seja padrão em todo Request que eu realizar
  return config;
});

httpClient.interceptors.response.use(
  response => {
    setGlobalLoading(false);
    return response;
  },
  error => {
    const canThrowAnError = (error.request.status =
      0 || error.request.status === 500);

    if (canThrowAnError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }

    // caso o gaiato tente colocar um Token invalido (a api retorna 401), apenas o direcionamos para a Home (rota não autenticada)
    if (error.response.status === 401) {
      router.push({ name: 'Home' });
    }
    setGlobalLoading(false);
    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient),
  feedbacks: FeedbackService(httpClient)
};
