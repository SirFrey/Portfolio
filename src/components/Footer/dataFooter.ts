import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faDiscord,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

type link = {
  title: string
  href: string
  iconFontAwesome: IconProp
}

export const links: link[] = [
  {
    href: 'https://www.linkedin.com/in/sirfrey/',
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
    title: 'GitHub',
  },
]
