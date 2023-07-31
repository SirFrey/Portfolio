import style from './ProjectCards.module.css';
import dataCards from './dataCards';

function ProjectCards() {
	return (
		<div className={style.wrapper}>
			{dataCards.map((cards, i) => {
				const { date, description, image, likes, project, website, alt } =
					cards;
				return (
					<div key={i} className={style.itemCard}>
						<a
							href={website.href}
							className={style.anchorCard}
							target='__blank__'
						>
							<img
								src={`${image.href}`}
								alt={alt}
								onError={() => {
									console.log('error image');
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
						</a>
					</div>
				);
			})}
		</div>
	);
}

export default ProjectCards;
