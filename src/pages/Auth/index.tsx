import R, { FormEvent } from 'react'
import { supabase } from '@/supabase'
import Swal from 'sweetalert2'
import S from './Auth.module.sass'
import { useNavigate } from 'react-router-dom'
import { routesName } from '@/index'

interface Iuser {
  id: string
  email: string
  created_at: Date
}

interface ICategory {
  id: number
  created_at: Date
  title: string
  userId: string
}

const Auth = () => {
  const navigate = useNavigate()

  const [email, setEmail] = R.useState('')
  const [password, setPassword] = R.useState('')
  const [change, setChange] = R.useState(true)

  const signUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
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
      const { error: insertUser } = await supabase
        .from<Iuser>('Users')
        .insert([{ id: user.id, email: email }])
        .single()
      const { error: insertCategory } = await supabase
        .from<ICategory>('Categories')
        .insert({ title: 'ежедневные', userId: user.id })

      if (insertUser) console.log(insertUser)
      if (insertCategory) console.log(insertCategory)
      navigate(routesName.Home)
    }
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
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
