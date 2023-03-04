import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '@/supabase'
import { routesName } from '@/index'
import { Settings } from '../Settings'
import { ReactComponent as SettingSVG } from '@/assets/icons/settings.svg'
import S from './Navbar.module.sass'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const signOut = async () => {
    await supabase.auth.signOut()
    navigate(routesName.Auth)
  }

  const [stateOpenSettings, setStateOpenSettings] = useState(false)

  const { pathname } = useLocation()

  return (
    <>
      {pathname !== '/auth' && (
        <div>
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
              <SettingSVG
                onClick={() => setStateOpenSettings(true)}
                className={S.settings}
              />
            </div>
          </div>
          {stateOpenSettings && (
            <Settings setOpenSettings={setStateOpenSettings} />
          )}
        </div>
      )}
    </>
  )
}
