type Card = {
  project: string
  stack: Array<string>
  date: string
  description: {
    es: string
    en: string
  }
  website: string
  github: string
  image: string
  likes?: string | number
  alt: string
  late: boolean
}
type ProjectCardType = Array<Card>

const dataCards: ProjectCardType = [
  {
    project: 'Project Z',
    stack: ['react', 'express', 'node'],
    date: 'Noviembre 2025',
    description: {
      es: 'Ejemplo de sitio web.',
      en: 'Example website.',
    },
    website: 'https://www.google.com',
    github: 'https://www.github.com',
    image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/326643/Sample%20Logo.png',
    likes: 200,
    alt: 'Image to show website',
    late: true,
  },
  {
    alt: 'Image to show website',
    stack: ['etc'],
    date: 'Diciembre 2016',
    description: {
      es: 'Sitio web minimalista hecho para mostrar papas doradas.',
      en: 'Simple website made to show potatoes',
    },
    github: 'https://www.github.com',
    image:
      'https://cdn.dribbble.com/users/77760/screenshots/2042501/potato.jpg',
    likes: 3242,
    project: 'Patata Website',
    website: 'https://potato.com',
    late: true,
  },
  {
    alt: 'Image to show website',
    stack: ['etc'],
    date: 'Octubre 2009',
    description: {
      es: 'La FLDSMFR.',
      en: 'The FLDSMFR.',
    },
    github: 'https://www.github.com',
    image:
      'https://img2.cgtrader.com/items/2303232/f818729b3f/large/cloudy-with-a-chance-of-meatballs-fldsmdfr-3d-model-obj-fbx-blend-skp.jpg',
    likes: 3242,
    project: 'La FLDSMFR',
    website:
      'https://cloudywithachanceofmeatballs.fandom.com/wiki/Flint_Lockwood_Diatonic_Super_Mutating_Dynamic_Food_Replicator_(FLDSMDFR)',
    late: true,
  },
  {
    alt: 'Image to show website',
    stack: ['etc'],
    date: 'Mayo 1972',
    description: {
      es: 'Tipo forchachon que ha salido en muchas películas, <strong>LA ROCA</strong>.',
      en: 'Strong guy who has been in many movies, <strong>THE ROCK</strong>.',
    },
    github: 'https://www.github.com',
    image:
      'https://ca-times.brightspotcdn.com/dims4/default/889ae96/2147483647/strip/true/crop/1135x744+0+0/resize/1200x787!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F90%2F82%2F4ad71dc542d2a9120bbefbcadf70%2Fquiere-la-roca-pelea-938977.JPG',
    likes: 322,
    project: 'The Rock',
    website: 'https://therockgear.com/',
    late: true
  },
  {
    alt: 'Image to show website',
    stack: ['etc'],
    date: 'Abril 1955',
    description: {
      es: "McDonals's.",
      en: "McDonald's.",
    },
    github: 'https://www.github.com',
    image:
      '',
    likes: 3242,
    project: "Mcdonald's",
    website: 'https://www.mcdonalds.com.ve/',
    late: true
  },
]
export default dataCards
