import { RefObject, useEffect, useState } from 'react'

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [point, setPoint] = useState([0, 0])

  useEffect(() => {
    if (!ref.current) return

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!

      const x = clientX - element.offsetLeft - element.offsetWidth / 2
      const y = clientY - element.offsetTop - element.offsetHeight / 2
      setPoint([x, y])
    }
    window.addEventListener('mousemove', handlePointerMove)

    return () => window.removeEventListener('mousemove', handlePointerMove)
  }, [])

  return point
}
