import axios from 'axios'

const api = axios.create({
  // Aqui vai a URL onde o back-end do Gabriel roda localmente.
  // Geralmente o Node.js roda na porta 3000, 5000 ou 8000. 
  baseURL: 'http://localhost:3000', 
})

export default api
