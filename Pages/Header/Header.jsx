import { useEffect, useRef } from 'react';
import Typed from 'react-typed';
import s from './Header.module.css';
const Header = () => {
	const elementRef = useRef();
	const bgDark = useRef();
	const navFixedBar = useRef();
	let offsetY;

	const blockScroll = isBlock => {
		if (isBlock) {
			offsetY = window.scrollY;
			document.documentElement.style.cssText = `
			position: fixed;
			top: -${offsetY}px`;
			document.body.style.cssText = `overflow-Y: scroll;`;

			elementRef.current.style.cssText = `
			transform: translateY(-64px)translateY(64.33px);
			position:absolute;
			top: ${offsetY}px`;
			return true;
		}
		return offsetY;
	};

	const unblockScroll = () => {
		const offsetY = blockScroll(false);
		document.documentElement.style.cssText = `
			position: static`;
		window.scrollBy({
			top: offsetY,
			behavior: 'instant',
		});
		elementRef.current.style.cssText = `
		transform: translateY(-64px)translateY(64.33px);
		position:fixed;`;
	};
	useEffect(() => {
		elementRef.current.style.transform = 'translateY(-64px)translateY(64.33px)';
		// if () {
		// 	elementRef.current.style.cssText = `
		// 	position:absolute;
		// 	top: calc(100vh + 31px)`;
		// }
		// let scrollval = 0;
		// const scrollEvent = () => {
		// 	if (scrollval > window.scrollY) {
		// 		elementRef.current.style.transform =
		// 			'translateY(-64px)translateY(64px)';
		// 	} else {
		// 		elementRef.current.style.transform =
		// 			'translateY(-64px)translateY(-64.33px)';
		// 	}
		// 	scrollval = window.scrollY;
		// };
		// const callback = entries => {
		// 	entries.forEach(({ isIntersecting }) => {
		// 		if (isIntersecting === false) {
		// 			// No mostrar nav
		// 			window.addEventListener('scroll', scrollEvent);
		// 			elementRef.current.style.transform =
		// 				'translateY(-64px)translateY(-64.33px)';
		// 		} else {
		// 			// Mostrar nav
		// 			window.removeEventListener('scroll', scrollEvent);
		// 			elementRef.current.style.transform =
		// 				'translateY(-64px)translateY(64px)';
		// 		}
		// 	});
		// };

		// const observer = new IntersectionObserver(callback);
		// observer.observe(document.querySelector('section:first-child'));
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
							blockScroll(true);
						}}
						className={s.container_bar}
					>
						<i className={`fa-solid fa-bars ${s.bar}`}></i>
					</div>
				</nav>
				<aside ref={navFixedBar} className={`${s.principal_nav}`}>
					<a
						onClick={() => {
							navFixedBar.current.style.transform = 'translate(18.75rem)';
							bgDark.current.style.animation = 'unShow .3s backwards';
							unblockScroll();
							setTimeout(() => {
								bgDark.current.style.display = 'none';
							}, 300);
						}}
						className={`fa-light fa-x ${s.x}`}
					></a>
					<ul
						onClick={({ target }) => {
							if (target.nodeName === 'A') {
								navFixedBar.current.style.transform = 'translate(18.75rem)';
								bgDark.current.style.animation = 'unShow .3s backwards';
								unblockScroll();
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
					navFixedBar.current.style.transform = 'translate(18.75rem)';
					target.style.animation = 'unShow .3s forwards';
					bgDark.current.style.animation = 'unShow .3s backwards';
					unblockScroll();
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
