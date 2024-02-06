import Css from '@assets/icons/CssLogo'
import Git from '@assets/icons/Git'
import GithubLogo from '@assets/icons/GitHubLogo'
import Html from '@assets/icons/Html'
import Js from '@assets/icons/Js'
import Next from '@assets/icons/Next'
import Node from '@assets/icons/Node'
import ReactLogo from '@assets/icons/ReactLogo'
import Terminal from '@assets/icons/Terminal'
import UsaLogo from '@assets/icons/UsaLogo'
import Typescript from '@assets/icons/Ts'
import FramerMotion from '@assets/icons/FramerMotion'
import Native from '@assets/icons/Native'
import Electron from '@assets/icons/Electron'
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
    Icon: <Typescript />,
    span: 'Typescript',
    color: '#007acc',
  },
  {
    Icon: <ReactLogo />,
    span: 'React',
    color: '#61dafb',
  },
  {
    Icon: <FramerMotion />,
    span: 'Framer Motion',
    color: '#bb4b96',
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
export const otherData = {
  es: [
    {
      Icon: <UsaLogo />,
      span: 'Ingles (A2)',
      color: '#f73e54',
    },
  ],
  en: [
    {
      Icon: <UsaLogo />,
      span: 'English (A2)',
      color: '#f73e54',
    },
  ],
}
export const maxListLength =
  [...knowledgeData, ...toolsData, ...otherData['en']].length - 1

export const developingData = {
  es: [
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
    {
      Icon: <Native />,
      span: 'React Native',
      color: '#61dbfb',
    },
  ],
  en: [
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
      span: 'English (B1-B2)',
      color: '#f73e54',
    },
    {
      Icon: <Native />,
      span: 'React Native',
      color: '#61dbfb',
    },
  ],
}
export const maxListLengthDev = developingData['en'].length - 1
