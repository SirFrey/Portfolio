'use client'
import s from '@components/Articles/Articles.module.css'
import { containerVariants, itemVariants } from '@assets/utils/props'
import { developingData } from '@components/Articles/dataArticles'
import { motion } from 'framer-motion'

export function ListContainerDev({ lang }: { lang: 'es' | 'en' }) {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className={s.skillCards}>
      {developingData[lang].map(({ Icon, span }, i: number) => (
        <motion.div className={s.skillCard} variants={itemVariants} key={i}>
          <span className={s.scIcon}>{Icon}</span>
          <span className={s.scLabel}>{span}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
