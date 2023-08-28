'use client'

import X from '@assets/X'
import SlideBar from '@components/NavBar/NavBar'
import { Variants, motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import Typed from 'react-typed'
import s from './Header.module.css'
import { links } from './dataHeader'
import { blockScroll, unblockScroll } from './scripts'

const variants: Variants = {
	hidden: {
		width: '0',
	},
	open: {
		width: 'min(100vw, 350px)',
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.2,
		},
	},
	navVisible: {
		height: '64px',
		transition: {
			type: 'spring',
		},
	},
	navHidden: {
		height: '0',
	},
}
const childVariants: Variants = {
	hidden: {
		x: 20,
		opacity: 0,
		filter: 'blur(4px)',
	},
	open: {
		x: 0,
		opacity: 1,
		filter: 'blur(0)',
	},
	hover: {
		backgroundColor: '#fff3',
	},
}
const Header = () => {
	const navFixed = useRef<HTMLElement>(null)
	const bgDark = useRef<HTMLDivElement>(null)
	const navFixedBar = useRef<HTMLElement>(null)
	const [isSideBarShow, setIsSideBarShow] = useState<boolean>(false)

	useLayoutEffect(() => {
		if (isSideBarShow && bgDark.current) {
			bgDark.current.style.display = 'inline-block'
			bgDark.current.style.animation = 'show .3s forwards'
			blockScroll({ isBlock: true })
		} else {
			unblockScroll()
			bgDark.current!.style.animation = 'unShow .2s backwards'
		}
	}, [isSideBarShow])
	return (
		<>
			<header>
				<motion.nav
					initial='navHidden'
					animate='navVisible'
					variants={variants}
					ref={navFixed}
					className={s.nav_fixed}
				>
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
				</motion.nav>
				<motion.aside
					initial='hidden'
					animate={isSideBarShow ? 'open' : ''}
					variants={variants}
					ref={navFixedBar}
					className={s.principal_nav}
				>
					<button onClick={() => setIsSideBarShow(false)} className={s.x}>
						<X />
					</button>
					<ul
						onClick={e => {
							const target = e.target as HTMLUListElement
							if (target.matches('a')) {
								setIsSideBarShow(false)
							}
						}}
						className={s.nav_fixed_ul}
					>
						{links.map(({ href, name }, i) => {
							return (
								<motion.li
									// whileHover='hover'
									variants={childVariants}
									className={s.nav_fixed_li}
									key={i}
								>
									<motion.a
										whileHover={{
											backgroundColor: '#fff3',
										}}
										href={'#' + href}
									>
										{name}
									</motion.a>
								</motion.li>
							)
						})}
					</ul>
				</motion.aside>
			</header>
			{/* <!-- Dark Background --> */}
			<div
				style={{ pointerEvents: isSideBarShow ? 'auto' : 'none' }}
				onClick={() => {
					setIsSideBarShow(false)
				}}
				onAnimationEnd={e => {
					const target = e.target as HTMLDivElement
					if (!isSideBarShow) {
						target.style.display = 'none'
					}
				}}
				ref={bgDark}
				id='bg'
				className={s.bg_dark}
			></div>
		</>
	)
}

export default Header
