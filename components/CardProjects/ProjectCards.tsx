import { MotionDiv } from '@components/FramerComps'
import Image from 'next/image'
import { CardItem } from './CardItem'
import style from './ProjectCards.module.css'
import dataCards from './dataCards'
export async function ProjectCards({ lang, dict }) {
  return (
    <MotionDiv className={style.wrapper}>
      {dataCards.map((cards, i) => {
        const { description, image, project, website, alt, late } = cards
        return (
          <CardItem disabled={late} key={i} i={i} website={website}>
            <div className={style.image_wrapper}>
              {late ? (
                <SoonComp />
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
              <h2 className={style.project_title}>{ late ? 'Soon...' : project}</h2>
              <p
                className={style.project_desc}
                dangerouslySetInnerHTML={{ __html: late ? 'Soon...' : description[lang] }}></p>
            </article>
          </CardItem>
        )
      })}
    </MotionDiv>
  )
}
export const SoonComp = () => {
  return <div className={style.soonComponent}>Soon...</div>
}
