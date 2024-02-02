'use client'
import s from '@components/Articles/Articles.module.css'

import { containerVariants } from '@assets/utils/props'
import { ListCompDev } from '@components/Articles/ListCompDev'
import {
  developingData,
  maxListLengthDev,
} from '@components/Articles/dataArticles'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
export function ListContainerDev({ lang }) {
  const [isPausedListDev, setPauseDevList] = useState(false)
  const [counterListDev, setCounterListDev] = useState(0)
  const lastIndex = maxListLengthDev

  useEffect(() => {
    // Interval list of list "Desarrollando..."
    const intervalListDev = setInterval(() => {
      setCounterListDev(count => {
        if (count === lastIndex) return 0
        return count + 1
      })
    }, 1500)

    if (isPausedListDev) {
      clearInterval(intervalListDev)
    }
    return () => clearInterval(intervalListDev)
  }, [counterListDev, isPausedListDev])

  return (
    <motion.ul
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{
        once: true,
      }}
      className={s.developing_list}>
      {developingData[lang].map(({ Icon, span, color }, i: number) => {
        return (
          <ListCompDev
            Icon={Icon}
            span={span}
            key={i}
            index={i}
            color={color}
            setCounter={setCounterListDev}
            counter={counterListDev}
            setPause={setPauseDevList}
          />
        )
      })}
    </motion.ul>
  )
}
