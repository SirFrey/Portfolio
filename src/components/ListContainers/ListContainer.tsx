'use client'
import s from '@components/Articles/Articles.module.css'
import {
  containerVariants,
  itemVariants,
  propsHiddenElm,
} from '@assets/utils/props'
import {
  knowledgeData,
  otherData,
  toolsData,
} from '@components/Articles/dataArticles'
import { motion } from 'framer-motion'
import type { JSX } from 'react'

type SkillItem = { Icon: JSX.Element; span: string; color: string }

function SkillCardGrid({ items }: { items: SkillItem[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className={s.skillCards}>
      {items.map(({ Icon, span }, i) => (
        <motion.div className={s.skillCard} variants={itemVariants} key={i}>
          <span className={s.scIcon}>{Icon}</span>
          <span className={s.scLabel}>{span}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function ListContainer({
  dict,
  lang,
}: {
  dict: { knowledgesSection: { tools: string; others: string } }
  lang: 'es' | 'en'
}) {
  return (
    <>
      <SkillCardGrid items={knowledgeData} />
      <motion.h3 {...propsHiddenElm} className={s.groupLabel}>{dict.knowledgesSection.tools}</motion.h3>
      <SkillCardGrid items={toolsData} />
      <motion.h3 {...propsHiddenElm} className={s.groupLabel}>{dict.knowledgesSection.others}</motion.h3>
      <SkillCardGrid items={otherData[lang]} />
    </>
  )
}
