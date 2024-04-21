import 'server-only'
import { LanguagesTypes } from 'types/paramsTypes'

// Define the type for the dictionaries object
const dictionaries = {
  en: () => import('./en.json').then(module => module.default),
  es: () => import('./es.json').then(module => module.default),
};


const getDictionary = async <T extends LanguagesTypes['lang']>(
  locale: T
) => {
  return dictionaries[locale]()
}

type Dictionary = Awaited<ReturnType<typeof dictionaries[LanguagesTypes['lang']]>>

export { type Dictionary, getDictionary }
