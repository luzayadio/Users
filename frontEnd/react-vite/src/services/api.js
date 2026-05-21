import axios from 'axios'

const api = axios.create({
  baseURL: 'https://users-gl4m.onrender.com',
})

export default api