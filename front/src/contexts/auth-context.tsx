import { createContext, ReactNode } from 'react'
import axios, { AxiosResponse } from 'axios'
import { setCookie } from 'nookies'
import Router from 'next/router'
import { api } from '@/services/api'

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  signIn: (data: SignInData) => Promise<void>
}

type UserToken = {
  access_token: string
  exp: number
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  async function signIn({ email, password }: SignInData) {
    const { data }: AxiosResponse<UserToken> = await axios.post(
      'http://localhost:4000/login',
      {
        email,
        password,
      },
    )

    const { access_token, exp } = data

    setCookie(undefined, 'gereciamento-de-veiculos.token', access_token, {
      maxAge: exp,
    })

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  )
}
