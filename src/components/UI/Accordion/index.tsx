import React, { Children, cloneElement, ReactElement, useMemo } from 'react'
import S from './Accordion.module.sass'

interface Iaccordion {
  visible: boolean
  children: ReactElement[]
  heightContent?: number
  paddingTop?: number
  paddingBottom?: number
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
      {Children.map(props.children, (child) =>
        cloneElement(child, { style: { ...calcHeigth } })
      )}
    </div>
  )
}
