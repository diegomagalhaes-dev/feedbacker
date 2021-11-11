// Aqui definimos a "camada de serviço", onde vamos comunicar com o backend
import axios from 'axios';
import router from '../router';
import AuthService from './auth';
import UserService from './user';

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

    // caso o gaiato tente colocar um Token invalido (a api retorna 401), apenas o direcionamos para a Home (rota não autenticada)
    if (error.response.status === 401) {
      router.push({ name: 'Home' });
    }
    return error;
  }
);

// Aqui, vamo interceptar as configurações que serão enviadas nos Requests
httpClient.interceptors.request.use(config => {
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
export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient)
};
