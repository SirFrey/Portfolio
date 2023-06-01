'use client';

import { useEffect, useRef, useState } from 'react';
import Typed from 'react-typed';
import s from './Header.module.css';
import X from '@assets/X';
import { blockScroll, unblockScroll } from './scripts';
import { motion } from 'framer-motion';

const variants = {
	open: {
		translate: '0',
	},
};
const Header = () => {
	const navFixed = useRef();
	const bgDark = useRef();
	const navFixedBar = useRef();
	const [isSideBarShow, setIsSideBarShow] = useState(false);
	const [isTransitionEnd, setIsTransitionEnd] = useState(false);

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
					<button
						disabled={!!isSideBarShow}
						onClick={() => {
							bgDark.current.style.display = 'inline-block';
							bgDark.current.style.animation = 'show .3s forwards';
							blockScroll({ element: navFixed, isBlock: true, offsetY });
							setIsSideBarShow(true);
						}}
						className={s.container_bar}
					>
						<i className={`fa-solid fa-bars ${s.bar}`}></i>
					</button>
				</nav>
				<motion.aside
					onTransitionEnd={e => {
						if (e.target.nodeName === 'ASIDE' && isSideBarShow) {
							setIsTransitionEnd(true);
						}
					}}
					animate={isSideBarShow ? 'open' : ''}
					variants={variants}
					ref={navFixedBar}
					className={`${s.principal_nav}`}
				>
					<a
						onClick={() => {
							setIsSideBarShow(false);
							setIsTransitionEnd(false);
							bgDark.current.style.animation = 'unShow .2s backwards';
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
								setIsSideBarShow(false);
								bgDark.current.style.animation = 'unShow .2s backwards';
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
				</motion.aside>
			</header>
			{/* <!-- background dark --> */}
			<div
				style={{ pointerEvents: isTransitionEnd ? 'auto' : 'none' }}
				onClick={() => {
					setIsSideBarShow(false);
					setIsTransitionEnd(false);
					bgDark.current.style.animation = 'unShow .2s backwards';
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
