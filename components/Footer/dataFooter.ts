import { Variants } from 'framer-motion'

type link = {
	title: string
	href: string
	iconFontAwesome: string
}

export const links: link[] = [
	{
		href: 'https://linkedin.com/in/moisesln',
		iconFontAwesome: 'fa-brands fa-linkedin',
		title: 'LinkedIn',
	},
	{
		href: '',
		iconFontAwesome: 'fa-brands fa-discord',
		title: 'Discord',
	},
	{
		href: '',
		iconFontAwesome: 'fa-brands fa-github',
		title: 'Github',
	},
	{
		href: '',
		iconFontAwesome: 'fa-solid fa-envelope',
		title: 'Mail',
	},
]
export const footerVariants: Variants = {
	hidden: {
		y: 20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
}
