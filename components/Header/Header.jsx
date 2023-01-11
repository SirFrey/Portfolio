import { useEffect, useRef } from 'react';
import Typed from 'react-typed';
import s from './Header.module.css';
import X from '../../assets/X';
import { blockScroll, unblockScroll } from './scripts';
const Header = () => {
	const navFixed = useRef();
	const bgDark = useRef();
	const navFixedBar = useRef();
	let offsetY;

	useEffect(() => {
		navFixed.current.style.transform = 'translateY(-64px)translateY(64.33px)';
	}, []);
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add(`${s.showRight}`);
				} else {
					entry.target.classList.remove(`${s.showRight}`);
				}
			});
		});
		const liElements = document.querySelectorAll(`.${s.hiddenRight}`);
		liElements.forEach(el => observer.observe(el));
	}, []);

	return (
		<>
			<header>
				<nav ref={navFixed} className={`${s.nav_fixed}`}>
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
							navFixedBar.current.style.translate = '0';
							bgDark.current.style.display = 'inline-block';
							bgDark.current.style.animation = 'show .3s forwards';
							blockScroll({ element: navFixed, isBlock: true, offsetY });
						}}
						className={s.container_bar}
					>
						<i className={`fa-solid fa-bars ${s.bar}`}></i>
					</div>
				</nav>
				<aside ref={navFixedBar} className={`${s.principal_nav}`}>
					<a
						onClick={() => {
							navFixedBar.current.style.translate = '100vw';
							bgDark.current.style.animation = 'unShow .3s backwards';
							unblockScroll({ element: navFixed });
							setTimeout(() => {
								bgDark.current.style.display = 'none';
							}, 300);
						}}
						className={`${s.x}`}
					>
						<X />
					</a>
					<ul
						onClick={({ target }) => {
							if (target.nodeName === 'A') {
								navFixedBar.current.style.translate = '100vw';
								bgDark.current.style.animation = 'unShow .3s backwards';
								unblockScroll({ element: navFixed });
								setTimeout(() => {
									bgDark.current.style.display = 'none';
								}, 100);
							}
						}}
						className={`${s.nav_fixed_ul}`}
					>
						<li className={`${s.nav_fixed_li} ${s.hiddenRight}`}>
							<a href='#Portfolio'>Proyectos</a>
						</li>
						<li className={`${s.nav_fixed_li} ${s.hiddenRight}`}>
							<a href='#About_me'>Sobre mi</a>
						</li>
						<li className={`${s.nav_fixed_li} ${s.hiddenRight}`}>
							<a href='#Contacto'>Contacto</a>
						</li>
					</ul>
				</aside>
			</header>
			{/* <!-- background dark --> */}
			<div
				onClick={({ target }) => {
					navFixedBar.current.style.translate = '100vw';
					target.style.animation = 'unShow .3s forwards';
					bgDark.current.style.animation = 'unShow .3s backwards';
					unblockScroll({ element: navFixed });
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
