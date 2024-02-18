'use client'

import { useEventListener } from '@assets/hooks/useEventListener'
import { useFollowPointer } from '@assets/hooks/useFollowPointer'
import { Variants, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import './Cursor.css'
import { MotionDiv } from '@components/FramerComps'
function Cursor() {
  const hoverables: Array<string> = ['BUTTON', 'A']
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useFollowPointer(ref)
  const [toogle, setToggle] = useState(false)
  const [hidden, setHidden] = useState(true)
  const variants: Variants = {
    hover: {
      scale: 3,
      borderWidth: '2px',
    },
    posBig: () => ({
      x: x,
      y: y,
      transition: {
        duration: 0.2,
      },
    }),
    posSmall: () => ({
      x: x,
      y: y,
      transition: {
        duration: 0.02,
      },
    }),
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  }
  useEventListener('pointermove', e => {
    const target = e.target as HTMLElement
    if (hoverables.includes(target.nodeName)) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  })
  useEventListener('pointermove', () => {
    setHidden(false)
  })
  useEventListener('pointerout', () => {
    setHidden(true)
  })

  return (
    <>
      <div className='cursor'>
        <MotionDiv
          initial='hidden'
          animate={['posBig', toogle ? 'hover' : '', !hidden ? 'visible' : '']}
          variants={variants}
          className='cursor__ball cursor__ball--big'
          ref={ref}></MotionDiv>
        <MotionDiv
          initial='hidden'
          animate={['posSmall', !hidden ? 'visible' : '']}
          variants={variants}
          className='cursor__ball cursor__ball--small'></MotionDiv>
      </div>
    </>
  )
}

export default Cursor
