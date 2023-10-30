'use client'
// Icons
import { motion } from 'framer-motion'
import s from './Articles.module.css'
// Components
import { propsHiddenElm } from '@assets/utils/props.ts'
import ProjectCards from '@components/CardProjects/ProjectCards.tsx'
import ListContainer from '@components/ListContainer/ListContainer.tsx'
import ListContainerDev from '@components/ListContainerDev/ListContainerDev.tsx'
import SDownComp from '@components/ScrolllDownComp/SDownComp.tsx'
import { useLayoutEffect, useRef } from 'react'
const Articles = () => {
	const mainSection = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		const imageSection = new Image()
		imageSection.addEventListener('load', e => {
			const target = e.target as HTMLImageElement
			if (mainSection.current) {
				mainSection.current.style.backgroundImage = `url(${target.src})`
				mainSection.current.classList.add(s.load)
			}
		})
		imageSection.src =
			'https://img.freepik.com/foto-gratis/diseno-concepto-plantilla-diseno-web-html_53876-120438.jpg?w=900&t=st=1660676885~exp=1660677485~hmac=2899e1383827e6af6608d048fbba3d6958763202894ec02e3e5bb4d598f6e3b5'
	}, [])
	return (
		<article className={s.articlePage}>
			<section ref={mainSection} id='inicio'>
				<div className={s.filterMainSection}>
					<div className='marginContainer'>
						<motion.h1 {...propsHiddenElm} className={`${s.titleH1}`}>
							Bienvenido a mi Portfolio Web
						</motion.h1>
						<motion.h2 {...propsHiddenElm} className={`${s.sectionCareer}`}>
							Frontend Developer
						</motion.h2>
					</div>
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
				<SDownComp />
			</section>
			<section>
				<div id='portfolio' className='marginContainer'>
					<motion.h2 {...propsHiddenElm}>Portfolio:</motion.h2>
					{/* <SliderCard /> */}
					<ProjectCards />
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
						/>
					</svg>
				</div>
				<div
					id='conocimientos'
					className={`marginContainer ${s.knowledgeContainer}`}
				>
					<motion.div {...propsHiddenElm}>
						<h2>Conocimientos:</h2>
						<h4>Lenguajes, Frameworks y Librerías:</h4>
					</motion.div>
					<ListContainer />
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
						/>
					</svg>
				</div>
			</section>

			<section>
				<div id='aboutme' className='marginContainer'>
					<h2>Sobre Mi</h2>
					<motion.p {...propsHiddenElm} className={'p'}>
						Desarrollador Frontend con conocimientos solidos en{' '}
						<strong>HTML5</strong>, <strong>CSS3</strong> y{' '}
						<strong>JavaScript</strong>, manejo tecnologías como{' '}
						<strong>React</strong>, Empaquetado de aplicaciones web con{' '}
						<strong>Webpack</strong> y <strong>Vite</strong>, control de
						versiones con <strong>Git</strong> y manejo de proyectos en equipo
						con <strong>Notion</strong> y <strong>Github</strong>.
					</motion.p>
					<motion.p {...propsHiddenElm} className='p'>
						Provengo de <strong>Venezuela(Caracas)</strong>, con aspiraciones de
						viajar a temprana edad y tengo el objetivo de llegar a pequeñas y
						grandes empresas con este portfolio, aceptando todo tipo de feedback
						por parte de los visitantes para este portfolio web y también para
						mis perfiles.
					</motion.p>
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
						/>
					</svg>
				</div>
			</section>

			<section>
				<div className={`marginContainer ${s.developingContainer}`}>
					<motion.h2 {...propsHiddenElm}>Desarrollando...</motion.h2>
					<ListContainerDev />
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
					/>
					<path
						d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
						opacity='.5'
						className={s.shapeFill}
					/>
					<path
						d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
						className={s.shapeFill}
					/>
				</svg>
			</div>
		</article>
	)
}

export default Articles
