import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Porta onde o servidor do Cazé está rodando
});

export default api;
