'use client'

import { useEventListener } from '@assets/hooks/useEventListener'
import { useFollowPointer } from '@assets/hooks/useFollowPointer'
import { type Variants, useWillChange } from 'framer-motion'
import { useRef, useState } from 'react'
import './cursor.css'
import { MotionDiv } from '@components/FramerComps'
function Cursor() {
  const hoverables: Array<string> = ['BUTTON', 'A']
  const ref = useRef<HTMLDivElement>(null)
  const [x, y] = useFollowPointer(ref)
  const [toogle, setToggle] = useState(false)
  const [hidden, setHidden] = useState(true)

  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  }
  useEventListener('pointermove', e => {
    const target = e.target as HTMLElement
    const isHoverable = hoverables.includes(target.nodeName)
    setToggle(isHoverable)
  })
  useEventListener('pointerout', () => {
    setHidden(true)
  })
  useEventListener('pointerover', () => {
    setHidden(false)
  })

  return (
    <>
      <MotionDiv
        variants={variants} initial='hidden' animate={[!hidden ? 'visible' : '']} className='cursor'>
        <MotionDiv
          animate={[!hidden ? 'visible' : '']}
          style={{
            translate: `${x}px ${y}px`,
            scale: toogle ? 3 : 1,
            borderWidth: toogle ? '2px' : '1px',
          }}
          variants={variants}
          className='cursor__ball cursor__ball--big'
          ref={ref} />
        <MotionDiv
          animate={[!hidden ? 'visible' : '']}
          style={{
            translate: `${x}px ${y}px`,
          }}
          variants={variants}
          className='cursor__ball cursor__ball--small' />
      </MotionDiv>
    </>
  )
}

export default Cursor
