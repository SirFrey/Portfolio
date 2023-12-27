import { Variants } from 'framer-motion'

export const links = {
  es: [
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
  ],
  en: [
    {
      name: 'Home',
      href: 'inicio',
    },
    {
      name: 'Portfolio',
      href: 'portfolio',
    },
    {
      name: 'Skills',
      href: 'conocimientos',
    },
    {
      name: 'About me',
      href: 'aboutme',
    },
    {
      name: 'Contact',
      href: 'contacto',
    },
  ],
}

export const variantsHeader: Variants = {
  hidden: {
    width: '0.5px',
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
  },
  navHidden: {
    height: '0.5px',
  },
}
