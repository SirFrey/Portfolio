import { itemVariants } from '@assets/utils/props'
import TextIcon from '@components/TextIcon/TextIcon'
import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { maxListLengthDev } from './dataArticles'
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
  setCounter,
  setPause,
  color,
  counter,
  index,
  ...props
}: ListItemType) => {
  const isSelected = index === counter
  const variants: Variants = {
    blur: {
      filter: 'blur(2px)',
    },
    unBlur: {
      filter: 'blur(0)',
    },
  }
  useEffect(() => {
    if (counter === maxListLengthDev) {
      setCounter(0)
    }
  }, [counter, setCounter])
  return (
    <motion.li
      {...props}
      onHoverStart={() => {
        setPause(true)
        setCounter(index)
      }}
      onHoverEnd={() => {
        setPause(false)
        setCounter(index + 1)
      }}
      whileHover={{
        boxShadow: '6px -5px 14px 2px rgba(0, 0, 0, 0.3)',
        scale: 1.1,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      variants={itemVariants}
      animate={{
        filter: `grayscale(${!isSelected ? 1 : 0})`,
      }}
      style={{ borderColor: color }}>
      <motion.div
        initial='blur'
        animate={isSelected ? 'unBlur' : ''}
        variants={variants}
        style={{
          display: 'flex',
        }}>
        {Icon}
      </motion.div>
      <TextIcon text={span} IsVisible={isSelected} />
    </motion.li>
  )
}
