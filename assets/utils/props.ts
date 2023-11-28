import { links } from '@components/Header/dataHeader'
import { HTMLMotionProps, Variants } from 'framer-motion'

export const variantsHiddenElm: Variants = {
	hidden: {
		opacity: 0,
		x: 20,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
}
export const propsHiddenElm: HTMLMotionProps<'div'> = {
	initial: 'hidden',
	whileInView: 'visible',
	viewport: {
		once: true,
	},
	variants: variantsHiddenElm,
}
export const containerVariants: Variants = {
	visible: {
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.45,
		},
	},
}

export const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		x: 20,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 1,
		},
	},
}
export const hrefNames = lang => {
	return [...links[lang].map(link => link.href)]
}
