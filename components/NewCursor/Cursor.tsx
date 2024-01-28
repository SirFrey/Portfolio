'use client'

import { useEventListener } from '@assets/hooks/useEventListener'
import { useFollowPointer } from '@assets/hooks/useFollowPointer'
import { Variants, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import './Cursor.css'
import { MotionDiv } from '@components/FramerComps'
function Cursor() {
  const hoverables: Array<string> = ['BUTTON', 'A', 'LI']
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useFollowPointer(ref)
  const [toogle, setToggle] = useState(false)
  const [hidden, setHidden] = useState(true)
  const variants: Variants = {
    hover: {
      scale: 3.5,
    },
    posBig: () => ({
      x: x,
      y: y,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 38,
      },
    }),
    posSmall: () => ({
      x: x + 11,
      y: y,
      transition: {
        type: 'tween',
        duration: 0.1,
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
          ref={ref}>
          <svg height='30' width='30'>
            <circle cx='15' cy='15' r='12' strokeWidth='0'></circle>
          </svg>
        </MotionDiv>

        <MotionDiv
          initial='hidden'
          animate={['posSmall', !hidden ? 'visible' : '']}
          variants={variants}
          className='cursor__ball cursor__ball--small'>
          <svg height='10' width='10'>
            <circle cx='5' cy='5' r='4' strokeWidth='0'></circle>
          </svg>
        </MotionDiv>
      </div>
    </>
  )
}

export default Cursor
