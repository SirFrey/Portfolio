import { headerLabels } from '@components/Header/dataHeader'
import type { Lang } from '../../i18n/loader'
import s from './LangSwitch.module.css'

// Each language is named in itself, whatever the page language.
const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
]

// Section ids are shared across locales, so switching keeps the reader's place.
export default function LangSwitch({
  lang,
  active,
  className,
}: {
  lang: Lang
  active: string
  className?: string
}) {
  const hash = active && active !== 'inicio' ? `#${active}` : ''
  return (
    <div
      className={`${s.switch}${className ? ` ${className}` : ''}`}
      role='group'
      aria-label={headerLabels[lang].language}>
      {LANGS.map(({ code, label, name }) =>
        code === lang ? (
          <span
            key={code}
            className={s.current}
            aria-current='true'
            title={name}>
            {label}
          </span>
        ) : (
          <a
            key={code}
            className={s.option}
            href={`/${code}/${hash}`}
            hrefLang={code}
            data-cursor='switch'
            data-cursor-label={name}
            lang={code}
            title={name}
            aria-label={name}>
            {label}
          </a>
        )
      )}
    </div>
  )
}
