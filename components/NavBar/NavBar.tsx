'use client';
import { useScrollSpy } from '@assets/hooks/useScrollSpy';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

	useLayoutEffect(() => {
		const ro = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const target = entry.target as HTMLDivElement;
				if (active === btnName) {
					setOffsets(target.offsetLeft, target.offsetWidth);
				}
			});
		});
		if (anchor.current) {
			ro.observe(anchor.current);
		}
	}, []);

	useLayoutEffect(() => {
		if (btnName === active && anchor.current) {
			anchor.current.classList.add('navbar-link--active');
			setOffsets(anchor.current.offsetLeft, anchor.current.offsetWidth);
		}
	}, [active]);
	return (
		<a
			type='button'
			className={btnClass}
			data-scroll-to={btnName}
			href={`#${btnName}`}
			ref={anchor}
		>
			{btnName}
		</a>
	);
};

export default function SlideBar() {
	const NAV_LINKS = [
		'Inicio',
		'Portfolio',
		'Conocimientos',
		'Sobre Mí',
		'Contacto',
	];
	const [offLeft, setOffLeft] = useState(4);
	const [offWidth, setOffWidth] = useState(94);
	const [activeLink, setActiveLink] = useState('Inicio');
	const [theme] = useState('dark');

	const navbarRef = useRef(null);
	const activeId = useScrollSpy(NAV_LINKS, {
		threshold: 0.5,
		// rootMargin: '0px 0px -50% 0px',
	});
	useEffect(() => {
		setActiveLink(activeId);
	}, [activeId]);
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
