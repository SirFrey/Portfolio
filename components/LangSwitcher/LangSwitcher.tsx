'use client'

import s from './LangSwitcher.module.css'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import enFlag from './english.svg'
import esFlag from './spain.svg'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
function LangSwitcher({ lang }) {
  const variants: Variants = {}
  const itemVariants: Variants = {
    closed: {
      y: 50,
      opacity: 0,
    },
    open: {
      y: 0,
      opacity: 1,
    },
  }
  const langList = [
    {
      value: 'en',
      icon: enFlag,
      label: 'en',
    },
    {
      value: 'es',
      icon: esFlag,
      label: 'es',
    },
  ]
  const router = useRouter()
  const labelLang = langList.filter(li => {
    return li.value === lang
  })[0]
  const [currentlang, setCurrentLang] = useState(labelLang)
  const listRef = useRef<HTMLLIElement>(null)
  const [isOpen, setOpen] = useState(false)
  const handleChange = e => {
    setCurrentLang(e)
    router.push('/' + e.value)
  }
  return (
    <motion.div
      className={s.langSwitcher}
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}>
      <AnimatePresence>
        <motion.ul
          initial='closed'
          variants={itemVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
          className={s.containerItems}>
          {langList.map(list => (
            <motion.li
              ref={listRef}
              className={s.itemSelect}
              key={list.label}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              whileHover={{
                backgroundColor: '#fff3',
              }}>
              <Link
                href={'/' + list.value}
                style={{
                  pointerEvents: isOpen ? 'auto' : 'none',
                }}>
                <img src={list.icon.src} alt={list.label} />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <motion.button onClick={() => setOpen(!isOpen)} className={s.menuSelect}>
        <img alt={currentlang.label} src={currentlang.icon.src} />
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}>
          <FontAwesomeIcon className={s.arrow} icon={faChevronDown} />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default LangSwitcher
