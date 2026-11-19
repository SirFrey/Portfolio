import type { Lang } from '../../i18n/loader'

export const links = {
  es: [
    {
      name: 'Inicio',
      href: 'inicio',
    },
    {
      name: 'Proyectos',
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
      name: 'Projects',
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

// Accessible names for the header's landmarks. Kept here with the nav links so
// every header string lives in one place.
export const headerLabels: Record<
  Lang,
  { sections: string; language: string; openMenu: string; closeMenu: string }
> = {
  es: {
    sections: 'Secciones',
    language: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  en: {
    sections: 'Sections',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
}
