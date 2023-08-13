'use client';
import { useEffect, useRef, useState } from 'react';
import './NavBar.css';
interface NavBarButtonProps {
	btnClass: string;
	btnName: string;
	setActive: (nameActive: string) => void;
	setOffsets: (
		offsetLeft: number | undefined,
		offsetWidth: number | undefined
	) => void;
	active: string;
}
const NavbarButton = ({
	btnClass,
	btnName,
	setActive,
	setOffsets,
	active,
}: NavBarButtonProps) => {
	const anchor = useRef<HTMLAnchorElement>(null);
	const handleClick = e => {
		const target = e.target as HTMLAnchorElement;
		target.classList.add('navbar-link--active');
		setOffsets(target.offsetLeft, target.offsetWidth);
	};
	const ro = new ResizeObserver(entries => {
		entries.forEach(entry => {
			const target = entry.target as HTMLDivElement;
			if (active === btnName) {
				setOffsets(target.offsetLeft, target.offsetWidth);
			}
		});
	});

	useEffect(() => {
		if (anchor.current) {
			ro.observe(anchor.current);
		}
	}, []);
	return (
		<a
			type='button'
			className={btnClass}
			data-scroll-to={btnName}
			// href={`#${btnName}`}
			onClick={e => {
				if (!btnClass.includes('navbar-link--active')) {
					setActive(btnName);
					handleClick(e);
					window.location.hash = `#${btnName}`;
				}
			}}
			onResize={() => {
				console.log('resize');
			}}
			ref={anchor}
		>
			{btnName}
		</a>
	);
};

export default function SlideBar() {
	// const defaultLink = window.location.hash.slice(1) ?? 'Inicio';

	const NAV_LINKS = ['Inicio', 'Portfolio', 'Conocimientos', 'Contacto'];
	const [offLeft, setOffLeft] = useState(4);
	const [offWidth, setOffWidth] = useState(126);
	const [activeLink, setActiveLink] = useState('Inicio');
	const [theme] = useState('dark');
	const navbarRef = useRef(null);
	const handleSetOffsets = (left: number, width: number) => {
		setOffLeft(left);
		setOffWidth(width);
	};

	// const handleSetTheme = e => {
	// 	e.target.textContent = theme;
	// 	setTheme(theme === 'dark' ? 'light' : 'dark');
	// };

	const setNavX = navbar => {
		if (!navbar) return '87%';
		if (navbar.classList.contains('nav-x-init')) {
			navbar.classList.remove('nav-x-init');
			navbar.classList.add('nav-x-post');
		}
		return `${
			100 -
			Math.round(
				(Math.round(offLeft + Math.round(offWidth / 2) + 60) /
					navbar.offsetWidth) *
					100
			)
		}%`;
	};

	return (
		<div id='body' className={theme}>
			<aside className='lightbulb'></aside>
			<header className='header'>
				<div
					className='navbar nav-x-init'
					ref={navbarRef}
					style={{ '--x': setNavX(navbarRef.current) } as React.CSSProperties}
				>
					<div className='navbar-curr--stroke' aria-hidden='true'></div>
					<div className='navbar-root'>
						{NAV_LINKS.map(link => (
							<NavbarButton
								key={link}
								btnName={link}
								btnClass={
									activeLink === link
										? 'navbar-link navbar-link--active'
										: 'navbar-link'
								}
								setActive={setActiveLink}
								setOffsets={handleSetOffsets}
								active={activeLink}
							/>
						))}
						<div
							className='navbar-curr--pill'
							aria-hidden='true'
							style={{ left: `${offLeft}px`, width: `${offWidth}px` }}
						></div>
						<div
							className='navbar-curr--glow'
							aria-hidden='true'
							style={{
								left: `${offLeft + Math.round(offWidth / 2) - 20.25}px`,
							}}
						></div>
					</div>
				</div>
			</header>
		</div>
	);
}
