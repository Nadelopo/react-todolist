import { RefObject } from 'react'

export const clickOutside = (ref: RefObject<Element>, func: () => void) => {
  addEventListener('click', (e) => {
    if (ref.current && !e.composedPath().includes(ref.current)) {
      func()
    }
  })
}
