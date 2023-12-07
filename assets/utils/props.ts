import { links } from '@components/Header/dataHeader'
import { HTMLMotionProps, SVGMotionProps, Variants } from 'framer-motion'

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
	},
}
const pathVariants: Variants = {
	hidden1: {
		translateX: '-80vw',
	},
	hidden2: {
		translateX: '20vw',
	},
	hidden3: {
		translateX: '20vw',
	},
	visible: {
		translateX: '0',
	},
}
export const propsPath: SVGMotionProps<SVGPathElement> = {
	variants: pathVariants,
}
export const hrefNames = lang => {
	return [...links[lang].map(link => link.href)]
}
