import { MotionDiv } from '@components/FramerComps/framerCompsClients'
import Image from 'next/image'
import CardItem from './CardItem'
import style from './ProjectCards.module.css'
import dataCards from './dataCards'

async function ProjectCards({ lang }) {
  return (
    <MotionDiv className={style.wrapper}>
      {dataCards.map((cards, i) => {
        const { date, description, image, likes, project, website, alt } = cards
        return (
          <CardItem key={i} i={i} website={website}>
            <Image width={300} height={300} src={`${image}`} alt={alt} />
            <article className={style.card_wrapper}>
              <div className={style.project_summary}>
                <h2 className={style.project_title}>{project}</h2>
                <p className={style.created_date}>Creado: {date}</p>
                <p
                  className={style.project_desc}
                  dangerouslySetInnerHTML={{ __html: description[lang] }}></p>
              </div>
            </article>
          </CardItem>
        )
      })}
    </MotionDiv>
  )
}

export default ProjectCards
