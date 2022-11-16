import React, {
  Children,
  cloneElement,
  createRef,
  ReactElement,
  RefObject,
  useEffect,
  useState,
} from 'react'
import S from './Accordion.module.sass'

interface Iaccordion {
  visible: boolean
  children: (ReactElement | ReactElement[])[]
  paddingTop?: number
  paddingBottom?: number
}

interface Istyles {
  paddingTop: string
  paddingBottom: string
  height: string
}

export const Accordion: React.FC<Iaccordion> = (props) => {
  const [heightFull, setHeightFull] = React.useState<number[]>([])
  const [styles, setStyles] = useState<(Istyles | null)[]>([])
  const [childrens, setChildrens] = useState<ReactElement[]>([])

  const refsArray: RefObject<HTMLElement>[] = childrens.map(() => createRef())

  useEffect(() => {
    setChildrens([])
    props.children.forEach((child) => {
      if (child instanceof Array) setChildrens((v) => [...v, ...child])
      else setChildrens((v) => [...v, child])
    })
  }, [])

  useEffect(() => {
    setHeightFull([])
    refsArray.forEach((el) => {
      if (el.current) {
        setHeightFull((v) => {
          if (el.current) return [...v, el.current.scrollHeight]
          else return v
        })
      }
    })
  }, [childrens])

  const calcHeigth = (heightF: number) => {
    let paddingTop = '0px'
    let paddingBottom = '0px'
    let height = '0px'

    paddingTop = (props.paddingTop ?? 5) + 'px'
    paddingBottom = (props.paddingBottom ?? 5) + 'px'
    height =
      heightF + (props.paddingTop ?? 5) + (props.paddingBottom ?? 5) + 'px'
    return props.visible
      ? {
          paddingTop,
          paddingBottom,
          height,
        }
      : null
  }

  useEffect(() => {
    setStyles([])
    heightFull.forEach((height) => setStyles((v) => [...v, calcHeigth(height)]))
  }, [props.visible, heightFull])

  return (
    <div className={`${S.accordion} ${props.visible && S.active}`}>
      {Children.map(childrens, (child, i) =>
        cloneElement(child, {
          style: { ...styles[i] },
          ref: refsArray[i],
        })
      )}
    </div>
  )
}
