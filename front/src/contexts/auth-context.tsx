import { createContext, ReactNode, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { setCookie } from 'nookies'
import Router from 'next/router'

type SignInData = {
  email: string
  password: string
}

type User = {
  id: string
  name_completed: string
  email: string
  date_of_birth: string
  address: string
  number_phone: string
}

type AuthContextType = {
  isAuthenticated: boolean
  signIn: (data: SignInData) => Promise<void>
  user: User | null
}

type UserToken = {
  access_token: string
  exp: number
  user: User
}

export const AuthContext = createContext({} as AuthContextType)

export const authProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const signIn = async ({ email, password }: SignInData) => {
    const { data }: AxiosResponse<UserToken> = await axios.post(
      'http://localhost:4000/login',
      {
        email,
        password,
      },
    )

    setCookie(undefined, 'gereciamento-de-veiculos.token', data.access_token, {
      maxAge: data.exp,
    })

    setUser(data.user)

    Router.push('/dashboard')
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
