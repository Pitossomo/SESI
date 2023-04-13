import { CardUser } from '@/components/card-user'
import { AuthContext } from '@/contexts/auth-context'
import { getAPIClient } from '@/services/axios'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useContext } from 'react'

interface User {
  user: {
    id: string
    email: string
    name_completed: string
    address: string
    number_phone: string
  }
}

export default function Dashboard({ user }: User) {
  const { handleUser } = useContext(AuthContext)
  handleUser(user)

  return <CardUser user={user} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'gereciamento-de-veiculos.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    const apiClient = getAPIClient(ctx)
    const { data } = await apiClient.get('/me')

    return {
      props: {
        user: data,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
