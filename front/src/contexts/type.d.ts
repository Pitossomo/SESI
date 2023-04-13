export type SignInData = {
  email: string
  password: string
}

export type AuthContextType = {
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
}

export type UserToken = {
  access_token: string
  exp: number
}
