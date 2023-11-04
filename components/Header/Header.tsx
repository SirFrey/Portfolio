'use client'
import MenuToggle from '@components/MenuToggle/MenuToggle'
import SlideBar from '@components/NavBar/NavBar'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Variants, motion, useCycle } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef } from 'react'
import Typed from 'react-typed'
import s from './Header.module.css'
import { links, variantsHeader } from './dataHeader'
import { blockScroll, unblockScroll, useWindowSize } from './scripts'
const childVariants: Variants = {
	hidden: {
		filter: 'blur(4px)',
		opacity: 0,
	},
	open: {
		filter: 'blur(0)',
		opacity: 1,
	},
	hover: {
		backgroundColor: '#fff3',
	},
}
const Header = () => {
	const windowSize = useWindowSize()
	const navFixed = useRef<HTMLElement>(null)
	const bgDark = useRef<HTMLDivElement>(null)
	const navFixedBar = useRef<HTMLElement>(null)
	const [isOpen, toggleOpen] = useCycle(false, true)
	useEffect(() => {
		const scroller = document.scrollingElement as HTMLElement
		document.documentElement.style.setProperty(
			'--scrollbar-width',
			`${window.innerWidth - scroller.clientWidth}px`
		)
	}, [windowSize])
	useLayoutEffect(() => {
		if (isOpen && bgDark.current) {
			bgDark.current.style.display = 'inline-block'
			bgDark.current.style.animation = 'show .3s forwards'
			blockScroll({ isBlock: true })
		} else {
			unblockScroll()
			bgDark.current!.style.animation = 'unShow .2s backwards'
		}
	}, [isOpen])
	return (
		<>
			<div className={s.containerMenuToggle}>
				<MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
			</div>
			<header className={s.mainHeader}>
				<motion.nav
					initial='navHidden'
					animate='navVisible'
					variants={variantsHeader}
					ref={navFixed}
					className={s.nav_fixed}
				>
					<div className={s.principal_icon}>
						<FontAwesomeIcon icon={faCode} className={s.codeIcon} />
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
					{/* <button
						onClick={() => setIsSideBarShow(true)}
						className={s.container_bar}
					>
					</button> */}
				</motion.nav>
				<motion.aside
					initial='hidden'
					animate={isOpen ? 'open' : ''}
					variants={variantsHeader}
					ref={navFixedBar}
					className={s.principal_nav}
				>
					<ul
						onClick={e => {
							const target = e.target as HTMLUListElement
							if (target.matches('a')) {
								toggleOpen()
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
				onClick={() => {
					toggleOpen()
				}}
				onAnimationEnd={e => {
					const target = e.target as HTMLDivElement
					if (!isOpen) {
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
