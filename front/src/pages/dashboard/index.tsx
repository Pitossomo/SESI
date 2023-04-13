import { CardUser } from '@/components/card-user'
import { getAPIClient } from '@/services/axios'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { User } from '@/@types/user'

export default function Dashboard({ user }: { user: User }) {
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
