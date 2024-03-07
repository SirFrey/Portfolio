import s from './Articles.module.css'
import { itemVariants } from '@assets/utils/props'
import TextIcon from '@components/TextIcon/TextIcon'
import { HTMLMotionProps, motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
interface ListItemType extends HTMLMotionProps<'li'> {
  Icon: JSX.Element
  span: string
  index: number
  counter: number
  color: string
  setCounter: Dispatch<SetStateAction<number>>
  setPause: Dispatch<SetStateAction<boolean>>
}
export const ListCompDev = ({
  Icon,
  span,
  setPause,
  setCounter,
  color,
  counter,
  index,
  ...props
}: ListItemType) => {
  const isSelected = index === counter
  return (
    <motion.div variants={itemVariants} className={s.compListWrapper}>
      <motion.li
        {...props}
        onHoverStart={() => {
          setPause(true)
          setCounter(index)
        }}
        onHoverEnd={() => {
          setPause(false)
          setCounter(prev => prev + 1)
        }}
        whileHover={{
          boxShadow: '6px -5px 14px 2px rgba(0, 0, 0, 0.3)',
          scale: 1.1,
        }}
        animate={{
          filter: `blur(${isSelected ? 5 : 0}px)`,
        }}>
        <motion.div
          initial='blur'
          style={{
            display: 'flex',
          }}>
          {Icon}
        </motion.div>
      </motion.li>
      <TextIcon text={span} IsVisible={isSelected} />
    </motion.div>
  )
}
