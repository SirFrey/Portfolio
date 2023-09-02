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
type IconType = {
	Icon: JSX.Element
	span: string
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
export const maxListLength = [...knowledgeData, ...toolsData, ...otherData]
	.length

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
export const maxListLengthDev = developingData.length
