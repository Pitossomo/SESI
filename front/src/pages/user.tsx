import { AuthContext } from '@/contexts/auth-context'
import { useContext } from 'react'

export default function User() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <h1>Dados do Usuário</h1>
      <p>{user?.name_completed}</p>
      <p>{user?.email}</p>
      <p>{user?.address}</p>
    </>
  )
}
