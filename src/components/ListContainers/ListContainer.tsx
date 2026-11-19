import s from '@components/Articles/Articles.module.css'
import {
  knowledgeData,
  otherData,
  toolsData,
} from '@components/Articles/dataArticles'
import type { CSSProperties, JSX } from 'react'

type SkillItem = { Icon: JSX.Element; span: string; color: string }

/**
 * A grid of skill cards. Rendered to static HTML (no client directive): the
 * staggered entrance is the site's `data-reveal` CSS, each card delayed by
 * its index through `--i`.
 */
export function SkillCardGrid({ items }: { items: SkillItem[] }) {
  return (
    <div className={s.skillCards}>
      {items.map(({ Icon, span }, i) => (
        <div
          className={s.skillCard}
          data-reveal
          style={{ '--i': i } as CSSProperties}
          key={i}>
          <span className={s.scIcon}>{Icon}</span>
          <span className={s.scLabel}>{span}</span>
        </div>
      ))}
    </div>
  )
}

export function ListContainer({
  dict,
  lang,
}: {
  dict: { knowledgesSection: { tools: string; others: string } }
  lang: 'es' | 'en'
}) {
  return (
    <>
      <SkillCardGrid items={knowledgeData} />
      <h3 data-reveal className={s.groupLabel}>{dict.knowledgesSection.tools}</h3>
      <SkillCardGrid items={toolsData} />
      <h3 data-reveal className={s.groupLabel}>{dict.knowledgesSection.others}</h3>
      <SkillCardGrid items={otherData[lang]} />
    </>
  )
}
