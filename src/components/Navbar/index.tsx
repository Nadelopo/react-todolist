import { routesName } from '@/index'
import { supabase } from '@/supabase'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import S from './Navbar.module.sass'
import { ReactComponent as SettingSVG } from '@/assets/icons/settings.svg'

export const Navbar = () => {
  const navigate = useNavigate()

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate(routesName.Auth)
  }

  const { pathname } = useLocation()

  return (
    <>
      {pathname !== '/auth' && (
        <div className="mb-8 pt-10">
          <div className={S.header}>
            <div>
              <button className="cbtn" onClick={signOut}>
                выйти
              </button>
            </div>

            <Link to={routesName.Profile}>
              <button className="cbtn">профиль</button>
            </Link>
            <Link to={routesName.Home}>
              <button className="cbtn">задачи</button>
            </Link>
            <SettingSVG className={S.settings} />
          </div>
        </div>
      )}
    </>
  )
}
