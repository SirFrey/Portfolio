import 'server-only'

interface Dictionary {
  [key: string]: () => Promise<{ [key: string]: any }>
}

const dictionaries: Dictionary = {
  en: () => import('./en.json').then(module => module.default),
  es: () => import('./es.json').then(module => module.default),
}

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]()
}
