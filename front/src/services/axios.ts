import axios from 'axios'
import { parseCookies } from 'nookies'
import * as next from 'next'

export const getAPIClient = (ctx?: Pick<next.NextPageContext, 'req'>) => {
  const { 'gereciamento-de-veiculos.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:4000',
  })

  api.interceptors.request.use((config) => {
    return config
  })

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return api
}
