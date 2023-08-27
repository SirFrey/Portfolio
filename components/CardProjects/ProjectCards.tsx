import { Variants, motion } from 'framer-motion'
import style from './ProjectCards.module.css'
import dataCards from './dataCards'

function ProjectCards() {
	const item: Variants = {
		hidden: {
			x: -40,
			opacity: 0,
			filter: 'blur(4px)',
		},
		show: (index: number) => ({
			x: 0,
			opacity: 1,
			filter: 'blur(0)',
			transition: {
				delay: 0.1 * index,
				duration: 0.4,
			},
		}),
		hover: {
			scale: 1.05,
			boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.4)',
			transition: {
				type: 'spring',
				stiffness: 400,
				damping: 17,
			},
		},
	}
	return (
		<motion.div className={style.wrapper}>
			{dataCards.map((cards, i) => {
				const { date, description, image, likes, project, website, alt } = cards
				return (
					// <div key={i} className={style.itemCard}>
					<motion.a
						initial='hidden'
						key={i}
						variants={item}
						href={website.href}
						className={style.anchorCard}
						target='__blank__'
						whileInView='show'
						whileHover='hover'
						custom={i}
						viewport={{ once: true }}
					>
						<img
							src={`${image.href}`}
							alt={alt}
							onError={() => {
								console.log('error image')
							}}
						/>
						<article
							// style={{
							// 	backgroundImage: `url(${image.href})`,
							// }}
							className={style.card_wrapper}
						>
							<div className={style.project_summary}>
								<h2 className={style.project_title}>{project}</h2>
								<p className={style.created_date}>Creado: {date}</p>
								<p
									className={style.project_desc}
									dangerouslySetInnerHTML={{ __html: description }}
								></p>
							</div>
							<div className={style.project_likes}>
								<div className={style.like_heart}>
									<i className={`fa-regular fa-heart ${style.icon}`}></i>
								</div>
								<p className={style.like_count}>{likes}</p>
							</div>
						</article>
					</motion.a>
					// </div>
				)
			})}
		</motion.div>
	)
}

export default ProjectCards
