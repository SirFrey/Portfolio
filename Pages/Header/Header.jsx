import { useEffect, useRef } from 'react';
import Typed from 'react-typed';
import s from './Header.module.css';
const Header = () => {
	const elementRef = useRef();
	const bgDark = useRef();
	const navFixedBar = useRef();

	useEffect(() => {
		let scrollval = 0;
		const scrollEvent = () => {
			if (scrollval > window.scrollY) {
				elementRef.current.style.transform =
					'translateY(-64px)translateY(64px)';
			} else {
				elementRef.current.style.transform =
					'translateY(-64px)translateY(-64.33px)';
			}
			scrollval = window.scrollY;
		};

		const callback = entries => {
			entries.forEach(({ isIntersecting }) => {
				if (isIntersecting === false) {
					// No mostrar nav
					window.addEventListener('scroll', scrollEvent);
					elementRef.current.style.transform =
						'translateY(-64px)translateY(-64.33px)';
				} else {
					// Mostrar nav
					window.removeEventListener('scroll', scrollEvent);
					elementRef.current.style.transform =
						'translateY(-64px)translateY(64px)';
				}
			});
		};

		const observer = new IntersectionObserver(callback);
		observer.observe(document.querySelector('section:first-child'));
	}, []);

	return (
		<>
			<header>
				<nav ref={elementRef} className={`${s.nav_fixed}`}>
					<div className={s.principal_icon}>
						<i className='fa-solid fa-code'></i>
						<Typed
							className={`${s.tag_title}`}
							strings={['Moises Castellanos']}
							typeSpeed={50}
							backSpeed={50}
							loop={true}
							startDelay={2000}
							backDelay={2000}
						/>
					</div>
					<div
						onClick={() => {
							navFixedBar.current.style.transform = 'translate(-18.75rem)';
							bgDark.current.style.display = 'inline-block';
							bgDark.current.style.animation = 'show .3s forwards';
						}}
						className={s.container_bar}
					>
						<i className={`fa-solid fa-bars ${s.bar}`}></i>
					</div>
				</nav>
				<nav ref={navFixedBar} className={`${s.principal_nav}`}>
					<a
						onClick={() => {
							navFixedBar.current.style.transform = 'translate(18.75rem)';
							bgDark.current.style.animation = 'unShow .3s backwards';

							setTimeout(() => {
								bgDark.current.style.display = 'none';
							}, 300);
						}}
						className={`fa-light fa-x ${s.x}`}
					></a>
					<ul
						onClick={({ target }) => {
							if (target.nodeName == 'A') {
								navFixedBar.current.style.transform = 'translate(18.75rem)';
								bgDark.current.style.animation = 'unShow .3s backwards';
							}
						}}
						className={`${s.nav_fixed_ul}`}
					>
						<li className={`${s.nav_fixed_li}`}>
							<a href='#Portfolio'>Proyectos</a>
						</li>
						<li className={`${s.nav_fixed_li}`}>
							<a href='#About_me'>Sobre mi</a>
						</li>
						<li className={`${s.nav_fixed_li}`}>
							<a href='#Contacto'>Contactame</a>
						</li>
					</ul>
				</nav>
			</header>
			{/* <!-- background dark --> */}
			<div
				onClick={({ target }) => {
					navFixedBar.current.style.transform = 'translate(18.75rem)';
					target.style.animation = 'unShow .3s forwards';
					bgDark.current.style.animation = 'unShow .3s backwards';
					setTimeout(() => {
						bgDark.current.style.display = 'none';
					}, 300);
				}}
				ref={bgDark}
				id='bg'
				className={`${s.bg_dark}`}
			></div>
		</>
	);
};

export default Header;
