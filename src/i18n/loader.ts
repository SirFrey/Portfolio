import en from './en.json'
import es from './es.json'

export const dicts = { en, es } as const

export type Lang = keyof typeof dicts
export type Dictionary = (typeof dicts)[Lang]
