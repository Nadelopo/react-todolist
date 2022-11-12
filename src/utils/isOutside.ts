import { RefObject } from 'react'

export const isOutside = (ref: RefObject<Element>, e: MouseEvent) => {
  return ref.current && !e.composedPath().includes(ref.current)
}
