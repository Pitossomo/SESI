import { createContext, ReactNode } from 'react'

import { setCookie } from 'nookies'
import Router from 'next/router'

import { getAPIClient } from '@/services/axios'
import { AxiosResponse } from 'axios'
import { AuthContextType, SignInData, UserToken } from './type'

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  async function signIn({ email, password }: SignInData) {
    const api = getAPIClient()

    const { data }: AxiosResponse<UserToken> = await api.post('/login', {
      email,
      password,
    })

    const { access_token, exp } = data

    setCookie(undefined, 'gereciamento-de-veiculos.token', access_token, {
      maxAge: exp,
    })

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`

    Router.push('/dashboard')
  }

  async function signOut() {
    console.log('Sign out')
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
