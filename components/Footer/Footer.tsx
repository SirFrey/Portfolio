'use client';

import s from './Footer.module.css';
const Footer = () => {
	return (
		<footer id='Contacto' className={`${s.footer_final}`}>
			<h2 className='hidden'>Contacto</h2>
			<ul className={`${s.ul_footer} `}>
				<li className='hidden'>
					<a
						href='https://linkedin.com/in/moisesln'
						title='Linkedin'
						target='_blank'
						rel='noreferrer'
					>
						<i className='fa-brands fa-linkedin '></i>
					</a>
				</li>
				<li className='hidden'>
					<a href='#' title='Discord'>
						<i className='fa-brands fa-discord'></i>
					</a>
				</li>
				<li className='hidden'>
					<a href='#' title='Instagram'>
						<i className='fa-brands fa-github'></i>
					</a>
				</li>
				<li className='hidden'>
					<a href='#' title='Mail'>
						<i className='fa-solid fa-envelope '></i>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
