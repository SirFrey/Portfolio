import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faDiscord,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
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
    href: 'https://discord.com/users/260433172460732416',
    iconFontAwesome: faDiscord,
    title: 'Discord',
  },
  {
    href: 'https://github.com/SirFrey',
    iconFontAwesome: faGithub,
    title: 'Github',
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
export const formVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  hiddenButton: { y: 20, opacity: 0 },
  hiddenRight: { opacity: 0, x: 20 },
  hiddenBottom: { opacity: 0, y: 20 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.5 } },
  visibleRight: { opacity: 1, x: 0, transition: { delay: 0.5 } },
  visibleBottom: { opacity: 1, y: 0, transition: { delay: 0.5 } },
  visibleButton: { y: 0, opacity: 1, transition: { delay: 0.5 } },
  focus: {
    boxShadow: '0 8px 17px 0 #0004',
    outline: '4px solid var(--principalColor)',
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 38,
    },
  },
  hover: {
    backgroundColor: 'var(--principalColor)',
    border: '1px solid var(--secondaryColor)',
    color: '#fff',
    fontWeight: '600',
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}
export const formProps = {
  variants: formVariants,
  viewport: {
    once: true,
  },
}
