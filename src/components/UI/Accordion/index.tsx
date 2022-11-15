import React, {
  Children,
  cloneElement,
  createRef,
  ReactElement,
  RefObject,
  useEffect,
  useMemo,
} from 'react'
import S from './Accordion.module.sass'

interface Iaccordion {
  visible: boolean
  children: ReactElement[]
  paddingTop?: number
  paddingBottom?: number
}

export const Accordion: React.FC<Iaccordion> = (props) => {
  const refsArray: RefObject<HTMLElement>[] = props.children.map(() =>
    createRef()
  )

  const [heightFull, setHeightFull] = React.useState(0)

  useEffect(() => {
    refsArray.forEach((el) => {
      if (el.current) setHeightFull(el.current.scrollHeight)
    })
  }, [])

  const calcHeigth = useMemo(() => {
    let paddingTop = '0px'
    let paddingBottom = '0px'
    let height = '0px'

    paddingTop = (props.paddingTop ?? 5) + 'px'
    paddingBottom = (props.paddingBottom ?? 5) + 'px'
    height =
      heightFull + (props.paddingTop ?? 5) + (props.paddingBottom ?? 5) + 'px'
    return props.visible
      ? {
          paddingTop,
          paddingBottom,
          height,
        }
      : ''
  }, [props.visible, heightFull])

  return (
    <div className={`${S.accordion} ${props.visible && S.active}`}>
      {Children.map(props.children, (child, i) =>
        cloneElement(child, {
          style: { ...calcHeigth },
          ref: refsArray[i],
        })
      )}
    </div>
  )
}
