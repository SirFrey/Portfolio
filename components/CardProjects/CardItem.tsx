'use client'
import { MotionA } from '@components/FramerComps/framerCompsClients'
import { Variants } from 'framer-motion'
import style from './ProjectCards.module.css'
import { motion } from 'framer-motion'

export function CardItem({
  children,
  website,
  disabled,
  i,
}: {
  children: React.ReactNode
  website: string
  disabled: boolean
  i: number
}) {
  const item: Variants = {
    hidden: {
      x: -40,
      opacity: 0,
    },
    show: (index: number) => ({
      x: 0,
      opacity: 1,
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
    <motion.button
      initial='hidden'
      variants={item}
      className={style.containerCard}
      whileInView='show'
      whileHover='hover'
      custom={i}
      viewport={{ once: true }}>
      {children}
    </motion.button>
  )
}
