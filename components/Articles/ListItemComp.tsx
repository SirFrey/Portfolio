import { itemVariants } from '@assets/utils/props'
import TextIcon from '@components/TextIcon/TextIcon'
import { HTMLMotionProps, motion } from 'framer-motion'
interface ListItemType extends HTMLMotionProps<'li'> {
	Icon: JSX.Element
	span: string
}
export const ListItemComp = ({ Icon, span, ...props }: ListItemType) => {
	return (
		<motion.li
			{...props}
			whileHover={{
				boxShadow: '6px -5px 14px 2px rgba(0, 0, 0, 0.3)',
				scale: 1.1,
			}}
			variants={itemVariants}
		>
			{Icon}
			<TextIcon text={span} />
		</motion.li>
	)
}
