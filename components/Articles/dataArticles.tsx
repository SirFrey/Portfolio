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
	color: string
}
export const knowledgeData: Array<IconType> = [
	{
		Icon: <Html />,
		span: 'HTML',
		color: '#e14f28',
	},
	{
		Icon: <Css />,
		span: 'CSS',
		color: '#1572b6',
	},
	{
		Icon: <Js />,
		span: 'Javascript',
		color: '#f6de1e',
	},
	{
		Icon: <ReactLogo />,
		span: 'React',
		color: '#61dafb',
	},
]
export const toolsData: IconType[] = [
	{
		Icon: <Git />,
		span: 'Git',
		color: '#f34f29',
	},
	{
		Icon: <GithubLogo />,
		span: 'GitHub',
		color: '#000000',
	},
	{
		Icon: <Terminal />,
		span: 'Terminal',
		color: '#e6e6e6',
	},
]
export const otherData: IconType[] = [
	{
		Icon: <UsaLogo />,
		span: 'Ingles (A2)',
		color: '#f73e54',
	},
]
export const maxListLength = [...knowledgeData, ...toolsData, ...otherData]
	.length

export const developingData: IconType[] = [
	{
		Icon: <Next />,
		span: 'Next.js 14',
		color: '#000000',
	},
	{
		Icon: <Node />,
		span: 'Node',
		color: '#74ab63',
	},
	{
		Icon: <UsaLogo />,
		span: 'Ingles (B1-B2)',
		color: '#f73e54',
	},
]
export const maxListLengthDev = developingData.length
