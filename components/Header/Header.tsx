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
		navFixed.current!.style.transform = 'translateY(-64px)translateY(64.33px)';
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
	useLayoutEffect(() => {
		if (isSideBarShow && bgDark.current) {
			bgDark.current.style.display = 'inline-block';
			bgDark.current.style.animation = 'show .3s forwards';
			blockScroll({ isBlock: true });
		} else {
			unblockScroll();
			bgDark.current!.style.animation = 'unShow .2s backwards';
		}
	}, [isSideBarShow]);
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
						onClick={() => setIsSideBarShow(true)}
						className={s.container_bar}
					>
						<i className={`fa-solid fa-bars ${s.bar}`}></i>
					</button>
				</nav>
				<motion.aside
					onAnimationComplete={() => {
						if (isSideBarShow) {
							setIsTransitionEnd(true);
						}
					}}
					animate={isSideBarShow ? 'open' : ''}
					variants={variants}
					ref={navFixedBar}
					transition={{
						type: 'tween',
						duration: 0.5,
					}}
					className={s.principal_nav}
				>
					<button
						onClick={() => {
							setIsSideBarShow(false);
							setIsTransitionEnd(false);
						}}
						className={s.x}
					>
						<X />
					</button>
					<ul
						onClick={e => {
							const target = e.target as HTMLUListElement;
							if (target.matches('a')) {
								setIsSideBarShow(false);
								setIsTransitionEnd(false);
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
			{/* <!-- Dark Background --> */}
			<div
				style={{ pointerEvents: isTransitionEnd ? 'auto' : 'none' }}
				onClick={() => {
					setIsSideBarShow(false);
					setIsTransitionEnd(false);
				}}
				onAnimationEnd={e => {
					const target = e.target as HTMLDivElement;
					if (isTransitionEnd) {
						target.style.display = 'none';
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
