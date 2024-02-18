import { itemVariants } from '@assets/utils/props'
import TextIcon from '@components/TextIcon/TextIcon'
import { HTMLMotionProps, motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
interface ListItemType<T> extends HTMLMotionProps<'li'> {
  Icon: JSX.Element
  span: string
  index: T
  counter: T
  color: string
  setCounter: Dispatch<SetStateAction<T | number>>
  setPause: Dispatch<SetStateAction<boolean>>
}
export function ListItemComp<T extends number>({
  Icon,
  span,
  color,
  setCounter,
  setPause,
  counter,
  index,
  ...props
}: ListItemType<T>){
  const isSelected = index === counter
  return (
    <motion.li
      whileHover={{
        boxShadow: '6px -5px 14px 2px rgba(0, 0, 0, 0.3)',
        scale: 1.1,
        zIndex: 2,
      }}
      onHoverStart={() => {
        setPause(true)
        setCounter(index)
      }}
      onHoverEnd={() => {
        setPause(false)
        setCounter((prev) => prev + 1)
      }}
      variants={itemVariants}
      animate={{
        filter: `grayscale(${!isSelected ? 1 : 0})`,
      }}
      style={{
        borderColor: color,
        zIndex: isSelected ? 2 : 0,
      }}
      {...props}>
      {Icon}
      <TextIcon text={span} IsVisible={isSelected} />
    </motion.li>
  )
}
