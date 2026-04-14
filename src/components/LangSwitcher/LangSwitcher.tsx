import s from './LangSwitcher.module.css'
import { useRef, useState } from 'react'
import enFlag from './english.svg'
import esFlag from './spain.svg'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function LangSwitcher({ lang }: { lang: string }) {
  const itemVariants: Variants = {
    closed: { y: 50, opacity: 0 },
    open: { y: 0, opacity: 1 },
  }
  const langList = [
    { value: 'en', icon: enFlag, label: 'en' },
    { value: 'es', icon: esFlag, label: 'es' },
  ]
  const labelLang = langList.find(li => li.value === lang) ?? langList[1]
  const [currentlang] = useState(labelLang)
  const listRef = useRef<HTMLLIElement>(null)
  const [isOpen, setOpen] = useState(false)
  return (
    <motion.div
      className={s.langSwitcher}
      animate={isOpen ? 'open' : 'closed'}>
      <AnimatePresence>
        <motion.ul
          initial='closed'
          variants={itemVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          className={s.containerItems}>
          {langList.map(list => (
            <motion.li
              ref={listRef}
              className={s.itemSelect}
              key={list.label}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              whileHover={{ backgroundColor: '#fff3' }}>
              <a
                href={'/' + list.value}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
                <img src={list.icon.src} alt={list.label} />
              </a>
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
