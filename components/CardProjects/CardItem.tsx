'use client'
import { MotionA } from '@components/FramerComps/framerCompsClients'
import { Variants } from 'framer-motion'
import style from './ProjectCards.module.css'

export function CardItem({
  children,
  website,
  i,
}: {
  children: React.ReactNode
  website: string
  i: number
}) {
  const item: Variants = {
    hidden: {
      x: -40,
      opacity: 0,
      filter: 'blur(4px)',
    },
    show: (index: number) => ({
      x: 0,
      opacity: 1,
      filter: 'blur(0)',
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
      },
    }),

    hover: {
      scale: 1.05,
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.4)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
      },
    },
  }
  return (
    <MotionA
      initial='hidden'
      variants={item}
      href={website}
      className={style.anchorCard}
      target='__blank__'
      whileInView='show'
      whileHover='hover'
      custom={i}
      viewport={{ once: true }}>
      {children}
    </MotionA>
  )
}
