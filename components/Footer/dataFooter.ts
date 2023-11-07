import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
	faDiscord,
	faGithub,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Variants } from 'framer-motion'

type link = {
	title: string
	href: string
	iconFontAwesome: IconProp
}

export const links: link[] = [
	{
		href: 'https://linkedin.com/in/moisesln',
		iconFontAwesome: faLinkedin,
		title: 'LinkedIn',
	},
	{
		href: '',
		iconFontAwesome: faDiscord,
		title: 'Discord',
	},
	{
		href: '',
		iconFontAwesome: faGithub,
		title: 'Github',
	},
	{
		href: '',
		iconFontAwesome: faEnvelope,
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
