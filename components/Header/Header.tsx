'use client';

import X from '@assets/X';
import SlideBar from '@components/NavBar/NavBar';
import { Variants, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import Typed from 'react-typed';
import s from './Header.module.css';
import { blockScroll, unblockScroll } from './scripts';

const variants: Variants = {
	open: {
		translate: '0',
	},
};
const Header = () => {
	const navFixed = useRef<HTMLElement>(null);
	const bgDark = useRef<HTMLDivElement>(null);
	const navFixedBar = useRef<HTMLElement>(null);
	const [isSideBarShow, setIsSideBarShow] = useState<boolean>(false);
	const [isTransitionEnd, setIsTransitionEnd] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (navFixed.current !== null) {
			navFixed.current.style.transform = 'translateY(-64px)translateY(64.33px)';
		}
	}, []);
	useLayoutEffect(() => {
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
				<nav ref={navFixed} className={s.nav_fixed}>
					<div className={s.principal_icon}>
						<i className='fa-solid fa-code'></i>
						<Typed
							className={s.tag_title}
							strings={['Moises Castellanos']}
							typeSpeed={50}
							backSpeed={50}
							loop={true}
							startDelay={2000}
							backDelay={2000}
						/>
					</div>
					<SlideBar />
					<button
						disabled={!!isSideBarShow}
						onClick={() => {
							if (bgDark.current !== null) {
								bgDark.current.style.display = 'inline-block';
								bgDark.current.style.animation = 'show .3s forwards';
								blockScroll({ isBlock: true });
								setIsSideBarShow(true);
							}
						}}
						className={s.container_bar}
					>
						<i className={`fa-solid fa-bars ${s.bar}`}></i>
					</button>
				</nav>
				<motion.aside
					// onTransitionEnd={e => {
					// 	const target = e.target as HTMLElement;
					// 	if (target.matches('aside') && isSideBarShow) {
					// 		setIsTransitionEnd(true);
					// 		console.log('sds');
					// 	}
					// }}
					onAnimationComplete={e => {
						console.log(e);
						if (isSideBarShow) {
							setIsTransitionEnd(true);
							console.log('sds');
						}
					}}
					animate={isSideBarShow ? 'open' : ''}
					variants={variants}
					ref={navFixedBar}
					transition={{
						type: 'spring',
						stiffness: 240,
						damping: 26,
					}}
					className={s.principal_nav}
				>
					<button
						onClick={() => {
							if (bgDark.current !== null) {
								setIsSideBarShow(false);
								setIsTransitionEnd(false);
								bgDark.current.style.animation = 'unShow .2s backwards';
								unblockScroll();
								setTimeout(() => {
									if (bgDark.current) bgDark.current.style.display = 'none';
								}, 300);
							}
						}}
						className={s.x}
					>
						<X />
					</button>
					<ul
						onClick={e => {
							const target = e.target as HTMLUListElement;
							if (target.matches('a') && bgDark.current) {
								setIsSideBarShow(false);
								bgDark.current.style.animation = 'unShow .2s backwards';
								unblockScroll();
								setTimeout(() => {
									if (bgDark.current) bgDark.current.style.display = 'none';
								}, 100);
							}
						}}
						className={s.nav_fixed_ul}
					>
						<li className={`${s.nav_fixed_li} ${s.hiddenRight}`}>
							<a href='#Portfolio'>Portfolio</a>
						</li>
						<li className={`${s.nav_fixed_li} ${s.hiddenRight}`}>
							<a href='#Conocimientos'>Conocimientos</a>
						</li>
						<li className={`${s.nav_fixed_li} ${s.hiddenRight}`}>
							<a href='#Sobre Mí'>Sobre mi</a>
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
					if (bgDark.current) {
						console.log('click!');
						setIsSideBarShow(false);
						setIsTransitionEnd(false);
						bgDark.current.style.animation = 'unShow .2s backwards';
						unblockScroll();
						setTimeout(() => {
							if (bgDark.current) bgDark.current.style.display = 'none';
						}, 300);
					}
				}}
				ref={bgDark}
				id='bg'
				className={s.bg_dark}
			></div>
		</>
	);
};

export default Header;
