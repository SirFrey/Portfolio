import type { Card } from './dataCards'
import type { Lang } from '../../i18n/loader'

/** Each project owns one colour of the chroma stripe. */
export const accent: Record<Card['id'], string> = {
  messaging: 'var(--cobalt)',
  resorsi: 'var(--marigold)',
  bot: 'var(--carmine)',
}

export const copy = {
  es: { visit: 'Visitar', internal: 'Herramienta interna del equipo de Resorsi', client: 'Proyecto privado para un cliente' },
  en: { visit: 'Visit', internal: 'Internal tool for the Resorsi team', client: 'Private client project' },
} satisfies Record<Lang, Record<string, string>>

export const host = (url: string) => url.replace(/^https?:\/\//, '')
