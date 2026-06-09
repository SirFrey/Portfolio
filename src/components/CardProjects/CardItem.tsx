'use client'
import { type Variants, motion } from 'framer-motion'
import style from './ProjectCards.module.css'

export function CardItem({
  children,
  i,
}: {
  children: React.ReactNode
  i: number
}) {
  const item: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 * index, duration: 0.4 },
    }),
    hover: {
      y: -6,
      boxShadow: '0 18px 40px rgba(0, 0, 0, 0.32)',
      transition: { type: 'spring', stiffness: 400, damping: 24 },
    },
  }
  return (
    <motion.article
      initial='hidden'
      variants={item}
      className={style.card}
      whileInView='show'
      whileHover='hover'
      custom={i}
      viewport={{ once: true }}>
      {children}
    </motion.article>
  )
}
