import React, { useMemo } from 'react'
import S from './Accordion.module.sass'

interface Iaccordion {
  visible: boolean
  heightContent?: number
  paddingTop?: number
  paddingBottom?: number
  list: { title: string; func: () => void }[]
}

export const Accordion: React.FC<Iaccordion> = (props) => {
  const calcHeigth = useMemo(() => {
    let paddingTop = '0px'
    let paddingBottom = '0px'
    let height = '0px'

    paddingTop = (props.paddingTop ?? 5) + 'px'
    paddingBottom = (props.paddingBottom ?? 5) + 'px'
    height =
      (props.heightContent ?? 27) +
      (props.paddingTop ?? 5) +
      (props.paddingBottom ?? 5) +
      'px'
    return props.visible
      ? {
          paddingTop,
          paddingBottom,
          height,
        }
      : ''
  }, [props.visible])

  return (
    <div className={`${S.accordion} ${props.visible && S.active}`}>
      {props.list.map((el, i) => (
        <button
          className={S.li}
          style={{ ...calcHeigth }}
          key={i}
          onClick={el.func}
        >
          {el.title}
        </button>
      ))}
    </div>
  )
}
