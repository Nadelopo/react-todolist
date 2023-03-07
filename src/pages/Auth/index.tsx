import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { supabase } from '@/supabase'
import { routesName } from '@/index'
import type { User } from '@/store/user/types'
import type { Category } from '@/store/categories/types'
import S from './Auth.module.sass'
import { createOne } from '@/utils/queries'
import { useCategoriesStore } from '@/store/categories'

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const setCategories = useCategoriesStore.getState().setCategories

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [change, setChange] = useState(true)

  const signUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      console.log(error)
      let message = 'Непредвиденная ошибка'
      switch (error.status) {
        case 400:
          message = 'Пользователь уже зарегистрирован'
          break
        case 422:
          message = 'Пароль должен состоять не менее чем из 6 символов'
      }
      Swal.fire(message, '', 'error')
    }
    if (user) {
      const data = await createOne<User>('Users', {
        id: user.id,
        email: user.email
      })
      if (data) {
        await createOne<Category>('Categories', {
          title: 'ежедневные',
          userId: user.id
        })
        await setCategories(user.id)
        navigate(routesName.Home)
      }
    }
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signIn({
      email,
      password
    })
    if (error) {
      console.log(error)
      Swal.fire('Данные не верны', '', 'error')
    } else navigate(routesName.Home)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    return change ? signIn() : signUp()
  }
  return (
    <div>
      <div className={S.main}>
        <div className={S.login__wrapper}>
          <div className="flex justify-between">
            <div>
              <button className="mbtn mb-6" onClick={() => setChange(true)}>
                войти
              </button>
            </div>
            <div>
              <button className="mbtn" onClick={() => setChange(false)}>
                зарегестрироваться
              </button>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="почта"
                required
              />
            </div>
            <div className="mb-6">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                minLength={6}
                placeholder="пароль"
                required
              />
            </div>
            <div>
              <button className="mbtn">
                {change ? 'войти' : 'зарегестрироваться'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
