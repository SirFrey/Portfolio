import { Variants, motion } from 'framer-motion'
import { useEffect } from 'react'
import s from './TextIcon.module.css'

interface Props {
  text: string
  className?: string
  IsVisible: boolean
}
function TextIcon({ text, className, IsVisible }: Props) {
  useEffect(() => {}, [IsVisible])
  const variants: Variants = {
    visible: {
      scale: 1
    },
    hidden: {
      scale: 0,
    },
  }
  return (
    <motion.span
      variants={variants}
      animate={[IsVisible ? 'visible' : 'hidden']}
      className={`${s.text} ${className}`}>
      {text}
    </motion.span>
  )
}

export default TextIcon
