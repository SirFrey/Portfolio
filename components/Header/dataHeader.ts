import { Variants } from 'framer-motion'

type link = {
	name: string
	href: string
}

export const links: link[] = [
	{
		name: 'Inicio',
		href: 'inicio',
	},
	{
		name: 'Portfolio',
		href: 'portfolio',
	},
	{
		name: 'Conocimientos',
		href: 'conocimientos',
	},
	{
		name: 'Sobre mí',
		href: 'aboutme',
	},
	{
		name: 'Contacto',
		href: 'contacto',
	},
]
export const variantsHeader: Variants = {
	hidden: {
		width: '0',
	},
	open: {
		width: 'min(100vw, 350px)',
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.2,
		},
	},
	navVisible: {
		height: '64px',
		transition: {
			type: 'spring',
		},
	},
	navHidden: {
		height: '0',
	},
}
