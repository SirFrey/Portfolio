import s from './Articles.module.css';
import UsaLogo from '../../assets/UsaLogo';
import Html from '../../assets/Html';
import CssLogo from '../../assets/CssLogo';
import Js from '../../assets/Js';
import ReactLogo from '../../assets/ReactLogo';
import Git from '../../assets/Git';
import Github from '../../assets/GitHubLogo';
import Terminal from '../../assets/Terminal';
import { useEffect } from 'react';

const Articles = () => {
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add(s.show);
				} else {
					entry.target.classList.remove(s.show);
				}
			});
		});
		const sections = document.querySelectorAll(`.${s.hidden}`);
		sections.forEach(el => observer.observe(el));
	}, []);
	return (
		<>
			<article>
				<section>
					<h1 className={s.hidden}>Bienvenido a mi portfolio web</h1>
					<h2 className={s.hidden}>Frontend Developer</h2>
				</section>
				<section className={`${s.hidden}`}>
					<h2 className={s.hidden} id='Portfolio'>
						Proyectos:
					</h2>
					<h4 className={s.hidden}>No publicados...</h4>
				</section>
				<section className={s.hidden}>
					<h2>Conocimientos:</h2>
					<h4>De lenguajes:</h4>
					<ul className={`${s.lang_list}`}>
						<li className={s.hidden}>
							<Html />
						</li>
						<li className={s.hidden}>
							<CssLogo />
						</li>
						<li className={s.hidden}>
							<Js />
						</li>
						<li className={s.hidden}>
							<ReactLogo />
						</li>
					</ul>
					<h4>De herramientas:</h4>
					<ul className={`${s.tool_list}`}>
						<li className={s.hidden}>
							<Git />
						</li>
						<li className={s.hidden}>
							<Github />
						</li>
						<li className={s.hidden}>
							<Terminal />
						</li>
					</ul>
					<h4>Otros:</h4>
					<ul className={`${s.other_list}`}>
						<li className={s.hidden}>
							<UsaLogo classname={`${s.fdd}`} />
							<br />
						</li>
					</ul>
				</section>
				<section className={s.hidden}>
					<h2 id='About_me'>Sobre Mi</h2>
					<p className={s.hidden}>
						Desarrollador Frontend con conocimientos solidos en HTML5, CSS3 y
						JavaScript, manejo tecnologías como React, Empaquetado de
						aplicaciones web con Webpack, control de versiones con Git y manejo
						de proyectos en equipo con Notion y Github.
					</p>
					<p className={s.hidden}>
						Soy Autodidacta, Atleta y aún Bachiller. Provengo de
						Caracas-Venezuela, con aspiraciones de poder viajar a temprana edad
						y tengo el objetivo de llegar a pequeñas y grandes empresas con este
						portfolio, acepto todo tipo de feedback por parte del los visitantes
						para este portfolio web y también para mis perfiles.
					</p>
				</section>
				<section className={s.hidden}>
					<h2 className={s.hidden}>Lo que voy aprender</h2>
					<p className={s.hidden}>
						En un futuro no muy lejano, voy a aprender algunos frameworks y
						librerías como Next, voy a aprender Node para el backend,
						aprender&eacute; m&aacute;s ingles hasta llegar a un nivel C1-B2, y,
						voy a convertirme en un Individual Contributer Experto
					</p>
				</section>
			</article>
			<aside>
				<div className='back'></div>
			</aside>
		</>
	);
};

export default Articles;
