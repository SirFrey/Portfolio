import { developingData } from '@components/Articles/dataArticles'
import { SkillCardGrid } from './ListContainer'

export function ListContainerDev({ lang }: { lang: 'es' | 'en' }) {
  return <SkillCardGrid items={developingData[lang]} />
}
