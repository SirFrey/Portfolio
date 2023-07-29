import style from './ProjectCards.module.css';

function ProjectCards() {
	return (
		<div className={style.wrapper}>
			<a href='#' className={style.anchorCard}>
				<article className={style.card_wrapper}>
					<div className={style.project_summary}>
						<h2 className={style.project_title}>Papa Website</h2>
						<p className={style.created_date}>Creado: Diciembre 2016</p>
						<p className={style.project_desc}>
							Sitio web minimalista hecho para mostrar papas doradas.
						</p>
					</div>
					<div className={style.project_likes}>
						<div className={style.like_heart}>
							<i className={`fa-regular fa-heart ${style.icon}`}></i>
						</div>
						<p className={style.like_count}>128</p>
					</div>
				</article>
			</a>
			<a href='#' className={style.anchorCard}>
				<article className={style.card_wrapper}>
					<div className={style.project_summary}>
						<h2 className={style.project_title}>Sitio de Pago Website</h2>
						<p className={style.created_date}>Creado: Noviembre 2016</p>
						<p className={style.project_desc}>
							Sistema de pago para utilizar cualquier tipo de robo o estafas 😀.
						</p>
					</div>
					<div className={`${style.project_likes}`}>
						<div className={`${style.like_heart}`}>
							<i className={`fa-regular fa-heart ${style.icon}`}></i>
						</div>
						<p className={`${style.like_count}`}>168</p>
					</div>
				</article>
			</a>
			<a href='#' className={style.anchorCard}>
				<article className={style.card_wrapper}>
					<div className={style.project_summary}>
						<h2 className={style.project_title}>Caracas Site</h2>
						<p className={style.created_date}>Creado: Enero 202X</p>
						<p className={style.project_desc}>
							Sitio supercalifragilisticoespialidoso.
						</p>
					</div>
					<div className={`${style.project_likes}`}>
						<div className={`${style.like_heart}`}>
							<i className={`fa-regular fa-heart ${style.icon}`}></i>
						</div>
						<p className={`${style.like_count}`}>168</p>
					</div>
				</article>
			</a>
		</div>
	);
}

export default ProjectCards;
