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
	setCounter: Dispatch<SetStateAction<number>>
	setPause: Dispatch<SetStateAction<boolean>>
}
export const ListCompDev = ({
	Icon,
	span,
	setCounter,
	setPause,
	counter,
	index,
	...props
}: ListItemType) => {
	const isSelected = index === counter

	const variants: Variants = {
		blur: {
			filter: 'blur(3px)',
		},
		unBlur: {
			filter: 'blur(0)',
		},
	}
	useEffect(() => {
		if (counter === maxListLengthDev) {
			setCounter(0)
		}
	}, [counter])
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
			}}
			variants={itemVariants}
		>
			<motion.div
				initial='blur'
				animate={isSelected ? 'unBlur' : ''}
				variants={variants}
			>
				{Icon}
			</motion.div>
			<TextIcon text={span} IsVisible={isSelected} />
		</motion.li>
	)
}
