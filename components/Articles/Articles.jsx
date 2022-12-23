// Icons
import s from './Articles.module.css';
import UsaLogo from '../../assets/UsaLogo';
import Html from '../../assets/Html';
import CssLogo from '../../assets/CssLogo';
import Js from '../../assets/Js';
import ReactLogo from '../../assets/ReactLogo';
import Git from '../../assets/Git';
import Github from '../../assets/GitHubLogo';
import Terminal from '../../assets/Terminal';
// Components
import SliderCard from '../../components/SliderCard/SliderCard';
import TextIcon from '../../components/TextIcon/TextIcon';
import Cursor from '../Cursor/Cursor';
import { useEffect } from 'react';

const Articles = () => {
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				} else {
					entry.target.classList.remove('show');
				}
			});
		});
		const sections = document.querySelectorAll(`.hidden`);
		sections.forEach(el => observer.observe(el));
	}, []);
	return (
		<>
			<Cursor />
			<article>
				<section>
					<div className='marginContainer'>
						<h1 className={`hidden ${s.titleH1}`}>
							Bienvenido a mi portfolio web
						</h1>

						<h2 className={'hidden'}>Frontend Developer</h2>
					</div>
					<div className={s.wave4}>
						<svg
							data-name='Layer 1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 1200 120'
							preserveAspectRatio='none'
						>
							<path
								d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
								opacity='.25'
								className={s.shapeFill}
							></path>
							<path
								d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
								opacity='.5'
								className={s.shapeFill}
							></path>
							<path
								d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
								className={s.shapeFill}
							></path>
						</svg>
					</div>
					<img
						src='https://img.freepik.com/foto-gratis/diseno-concepto-plantilla-diseno-web-html_53876-120438.jpg?w=900&t=st=1660676885~exp=1660677485~hmac=2899e1383827e6af6608d048fbba3d6958763202894ec02e3e5bb4d598f6e3b5'
						className={s.bgFixed}
					/>
					<div className={s.container}>
						<div className={s.chevron}></div>
						<div className={s.chevron}></div>
						<div className={s.chevron}></div>
						<span className={s.text}>Scroll down</span>
					</div>
				</section>
				<section>
					<div className='marginContainer'>
						<h2 className={'hidden'} id='Portfolio'>
							Proyectos:
						</h2>
						<SliderCard />
					</div>
				</section>
				<section>
					<div className={s.wave3}>
						<svg
							data-name='Layer 1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 1200 120'
							preserveAspectRatio='none'
						>
							<path
								d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
								className={s.shapeFill}
							></path>
						</svg>
					</div>
					<div className='marginContainer'>
						<div className='hidden'>
							<h2>Conocimientos:</h2>
							<h4>Lenguajes, Frameworks y Librerías:</h4>
						</div>
						<ul className={`${s.lang_list}`}>
							<li className={'hidden'}>
								<Html />
								<TextIcon text='HTML' />
							</li>
							<li className={'hidden'}>
								<CssLogo />
								<TextIcon text='CSS' />
							</li>
							<li className={'hidden'}>
								<Js />
								<TextIcon text='Javascript' />
							</li>
							<li className={'hidden'}>
								<ReactLogo />
								<TextIcon text='React' />
							</li>
						</ul>
						<h4 className='hidden'>Herramientas:</h4>
						<ul className={`${s.tool_list}`}>
							<li className={'hidden'}>
								<Git />
								<TextIcon text='Git' />
							</li>
							<li className={'hidden'}>
								<Github />
								<TextIcon text='Github' />
							</li>
							<li className={'hidden'}>
								<Terminal />
								<TextIcon text='Linux - Terminal' />
							</li>
						</ul>
						<h4 className='hidden'>Otros:</h4>
						<ul className={`${s.other_list}`}>
							<li className={'hidden'}>
								<UsaLogo />
								<TextIcon text='Ingles (A2)' />
							</li>
						</ul>
					</div>
					<div className={s.wave}>
						<svg
							data-name='Layer 1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 1200 120'
							preserveAspectRatio='none'
						>
							<path
								d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
								className={s.shapeFill}
							></path>
						</svg>
					</div>
				</section>

				<section>
					<div className='marginContainer'>
						<h2 id='About_me'>Sobre Mi</h2>
						<p className={'hidden'}>
							Desarrollador Frontend con conocimientos solidos en HTML5, CSS3 y
							JavaScript, manejo tecnologías como React, Empaquetado de
							aplicaciones web con Webpack y Vite, control de versiones con Git
							y manejo de proyectos en equipo con Notion y Github.
						</p>
						<p className='hidden'>
							Soy Autodidacta, Atleta y aún Bachiller. Provengo de
							Caracas-Venezuela, con aspiraciones de poder viajar a temprana
							edad y tengo el objetivo de llegar a pequeñas y grandes empresas
							con este portfolio, acepto todo tipo de feedback por parte de los
							visitantes para este portfolio web y también para mis perfiles.
						</p>
					</div>
					<div className={s.wave5}>
						<svg
							data-name='Layer 1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 1200 120'
							preserveAspectRatio='none'
						>
							<path
								d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
								className={s.shapeFill}
							></path>
						</svg>
					</div>
				</section>

				<section>
					<div className='marginContainer'>
						<h2 className='hidden'>Habilidades a Desarrollar...</h2>
						<p className={'hidden'}>
							Voy a aprender algunos frameworks y librerías como Next, Node para
							el backend, consolidare mi ingles hasta llegar a un nivel C1-B2,
							y, voy a convertirme en un Individual Contributer Experto.
						</p>
					</div>
				</section>
				<div className={s.wave2}>
					<svg
						data-name='Layer 1'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 1200 120'
						preserveAspectRatio='none'
					>
						<path
							d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
							opacity='.25'
							className={s.shapeFill}
						></path>
						<path
							d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
							opacity='.5'
							className={s.shapeFill}
						></path>
						<path
							d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
							className={s.shapeFill}
						></path>
					</svg>
				</div>
			</article>
		</>
	);
};

export default Articles;
