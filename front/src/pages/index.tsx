import { FormLogin } from '@/components/form-login'
import { AuthContext } from '@/contexts/auth-context'

import { useContext } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}

export default function Home() {
  const { register, handleSubmit } = useForm<FormValues>()
  const { signIn } = useContext(AuthContext)

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data)
    } catch (error) {
      console.log('Error na requisição: ', error)
    }
  })

  return <FormLogin register={register} onSubmit={onSubmit} />
}
