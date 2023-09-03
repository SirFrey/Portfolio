import { itemVariants } from '@assets/utils/props'
import TextIcon from '@components/TextIcon/TextIcon'
import { HTMLMotionProps, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { maxListLength } from './dataArticles'
interface ListItemType extends HTMLMotionProps<'li'> {
	Icon: JSX.Element
	span: string
	index: number
	counter: number
	color: string
	setCounter: Dispatch<SetStateAction<number>>
	setPause: Dispatch<SetStateAction<boolean>>
}
export const ListItemComp = ({
	Icon,
	span,
	color,
	setCounter,
	setPause,
	counter,
	index,
	...props
}: ListItemType) => {
	const isSelected = index === counter
	useEffect(() => {
		if (counter === maxListLength) {
			setCounter(0)
		}
	}, [counter])
	return (
		<motion.li
			{...props}
			whileHover={{
				boxShadow: '6px -5px 14px 2px rgba(0, 0, 0, 0.3)',
				scale: 1.1,
			}}
			onHoverStart={() => {
				setPause(true)
				setCounter(index)
			}}
			onHoverEnd={() => {
				setPause(false)
				setCounter(index + 1)
			}}
			variants={itemVariants}
			style={{ borderColor: color }}
		>
			<div>{Icon}</div>
			<TextIcon text={span} IsVisible={isSelected} />
		</motion.li>
	)
}
