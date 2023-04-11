import { api } from '@/services/api'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name_completed: string
  address: string
  number_phone: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const signIn = async () => {
      // const { 'gereciamento-de-veiculos.token': token } = parseCookies()

      // if (token) {
      //   const { data } = await axios.get('http://localhost:4000/me', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   console.log(data)
      //   console.log(token)
      //   setUser(data)
      // }
      const response = await api.get('/me')
      // setUser(data)
      // console.log(data)
      console.log(response)
    }

    signIn()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name_completed}</p>
      <p>Address: {user?.address}</p>
      <p>id: {user?.id}</p>
      <p>Number phone: {user?.number_phone}</p>
      <p>Email: {user?.email}</p>
    </div>
  )
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
    const { data } = await axios.get('http://localhost:4000/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      props: {
        user: data,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
