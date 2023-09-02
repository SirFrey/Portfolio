import { Variants, motion } from 'framer-motion'
import s from './TextIcon.module.css'

interface Props {
	text: string
	className?: string
	IsVisible: boolean
}
function TextIcon({ text, className, IsVisible }: Props) {
	const variants: Variants = {
		visible: {
			opacity: 1,
			filter: 'blur(0)',
			transition: {
				duration: 0.6,
			},
		},
		hidden: {
			opacity: 0,
			filter: 'blur(2px)',
		},
	}
	return (
		<motion.span
			variants={variants}
			initial='hidden'
			animate={IsVisible ? 'visible' : ''}
			className={`${s.text} ${className}`}
		>
			{text}
		</motion.span>
	)
}

export default TextIcon
