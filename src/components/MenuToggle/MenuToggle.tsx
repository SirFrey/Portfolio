import { motion } from 'framer-motion'
import s from './MenuToggle.module.css'
const Path = props => (
  <motion.path
    strokeWidth='3'
    stroke='currentColor'
    strokeLinecap='round'
    {...props}
  />
)
function MenuToggle({ toggle, isOpen }) {
  return (
    <motion.button
      initial={['closed', 'hidden']}
      animate={[isOpen ? 'open' : '', 'visible']}
      onClick={toggle}
      variants={{
        hidden: {
          y: -64,
        },
        visible: {
          y: 0,
          transition: {
            type: 'spring',
          },
        },
      }}
      className={s.button}>
      <svg viewBox='0 0 23 23'>
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </motion.button>
  )
}

export default MenuToggle
