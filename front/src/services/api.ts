import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'gereciamento-de-veiculos.token': token } = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:4000',
})

api.interceptors.request.use((config) => {
  console.log(config)
  return config
})

if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
