import { MotionDiv } from '@components/FramerComps'
import Image from 'next/image'
import { CardItem } from './CardItem'
import style from './ProjectCards.module.css'
import dataCards from './dataCards'
import { LanguagesTypes } from 'types/paramsTypes'
import { Dictionary } from 'app/[lang]/dictionaries/dictionarie'

export async function ProjectCards({ lang, dict }: { lang: LanguagesTypes['lang'], dict: Dictionary }) {
  return (
    <MotionDiv className={style.wrapper}>
      {dataCards.map((cards, i) => {
        const { description, image, project, website, alt, late } = cards
        return (
          <CardItem disabled={late} key={i} i={i} website={website}>
            <div className={style.image_wrapper}>
              {late ? (
                <SoonComp dict={dict} />
              ) : (
                <Image
                  src={image}
                  alt={alt}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
            <article className={style.card_wrapper}>
              <h2 className={style.project_title}>{late ? dict.portfolioSection.soon : project}</h2>
              <p
                className={style.project_desc}
                dangerouslySetInnerHTML={{ __html: late ? dict.portfolioSection.soon : description[lang] }}></p>
            </article>
          </CardItem>
        )
      })}
    </MotionDiv>
  )
}
export const SoonComp = ({ dict }: { dict: Dictionary }) => {
  return <div className={style.soonComponent}>{dict.portfolioSection.soon}</div>
}
