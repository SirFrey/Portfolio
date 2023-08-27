import Css from '@assets/CssLogo'
import Git from '@assets/Git'
import GithubLogo from '@assets/GitHubLogo'
import Html from '@assets/Html'
import Js from '@assets/Js'
import Next from '@assets/Next'
import Node from '@assets/Node'
import ReactLogo from '@assets/ReactLogo'
import Terminal from '@assets/Terminal'
import UsaLogo from '@assets/UsaLogo'
import { Variants } from 'framer-motion'
type IconType = {
	Icon: JSX.Element
	span: string
}
export const containerVariants: Variants = {
	visible: {
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
}
export const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		filter: 'blur(4px)',
		x: '-100%',
	},
	visible: {
		opacity: 1,
		filter: 'blur(0)',
		x: 0,
	},
}
export const knowledgeData: Array<IconType> = [
	{
		Icon: <Html />,
		span: 'HTML',
	},
	{
		Icon: <Css />,
		span: 'CSS',
	},
	{
		Icon: <Js />,
		span: 'Javascript',
	},
	{
		Icon: <ReactLogo />,
		span: 'React',
	},
]
export const toolsData: IconType[] = [
	{
		Icon: <Git />,
		span: 'Git',
	},
	{
		Icon: <GithubLogo />,
		span: 'GitHub',
	},
	{
		Icon: <Terminal />,
		span: 'Terminal',
	},
]
export const otherData: IconType[] = [
	{
		Icon: <UsaLogo />,
		span: 'Ingles (A2)',
	},
]
export const developingData: IconType[] = [
	{
		Icon: <Next />,
		span: 'Next.js 13',
	},
	{
		Icon: <Node />,
		span: 'Node',
	},
	{
		Icon: <UsaLogo />,
		span: 'Ingles (B1-B2)',
	},
]
