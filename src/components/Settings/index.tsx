import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import S from './Settings.module.sass'
import { ReactComponent as CloseSVG } from '@/assets/icons/close.svg'

interface Isettings {
  setOpenSettings: Dispatch<SetStateAction<boolean>>
}

export const Settings: React.FC<Isettings> = ({ setOpenSettings }) => {
  const contentRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className={S.root}>
      <div className="container">
        <div ref={contentRef} className="wrapper">
          <div className="flex justify-between mb-2">
            <div>настройки</div>
            <div>
              <CloseSVG onClick={() => setOpenSettings(false)} />
            </div>
          </div>
          <hr />

          <div className="mt-4">
            <div
              className="cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              сменить тему
            </div>
            {/* <Accordion :visible="visible"> */}
            <div>
              <div className={S.li} onClick={() => setTheme('dark')}>
                темная
              </div>
              <div className={S.li} onClick={() => setTheme('light')}>
                светлая
              </div>
              <div className={S.li} onClick={() => setTheme('turquoise')}>
                бирюзовый
              </div>
              <div className={S.li} onClick={() => setTheme('purple')}>
                фиолетовый
              </div>
              <div className={S.li} onClick={() => setTheme('orange')}>
                ораньжевый
              </div>
            </div>
            {/* </Accordion> */}
          </div>
        </div>
      </div>
    </div>
  )
}
