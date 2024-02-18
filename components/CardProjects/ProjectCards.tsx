import { MotionDiv } from '@components/FramerComps'
import Image from 'next/image'
import { CardItem } from './CardItem'
import style from './ProjectCards.module.css'
import dataCards from './dataCards'
export async function ProjectCards({ lang, dict }) {
  return (
    <MotionDiv className={style.wrapper}>
      {dataCards.map((cards, i) => {
        const { date, description, image, likes, project, website, alt } = cards
        return (
          <CardItem key={i} i={i} website={website}>
            <div className={style.image_wrapper}>
              <Image
                src={image}
                alt={alt}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <article className={style.card_wrapper}>
              <h2 className={style.project_title}>{project}</h2>
              <p
                className={style.project_desc}
                dangerouslySetInnerHTML={{ __html: description[lang] }}></p>
              {/* <p className={style.created_date}> */}
              {/*   {dict.portfolioSection.date} {date} */}
              {/* </p> */}
            </article>
          </CardItem>
        )
      })}
    </MotionDiv>
  )
}
