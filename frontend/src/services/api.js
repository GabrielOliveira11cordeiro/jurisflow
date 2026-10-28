import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Porta onde o servidor do Cazé está rodando
});
api.interceptors.request.use((config) => {
  const usuario = JSON.parse(localStorage.getItem('@JurisFlow:usuario') || 'null');
  if (usuario?.token) config.headers.Authorization = `Bearer ${usuario.token}`;
  return config;
});

export default api;
