import s from './Footer.module.css';
const Footer = () => {
	return (
		<footer className={`${s.footer_final}`}>
			<h2 id='Contacto' className='hidden'>
				Contacto
			</h2>
			<ul className={`${s.ul_footer} `}>
				<li className='hidden'>
					<a href='#' alt='linkedin' title='Linkedin'>
						<i className='fa-brands fa-linkedin '></i>
					</a>
				</li>
				<li className='hidden'>
					<a href='#' alt='discord' title='Discord'>
						<i className='fa-brands fa-discord'></i>
					</a>
				</li>
				<li className='hidden'>
					<a href='#' alt='instagram' title='Instagram'>
						<i className='fa-brands fa-instagram '></i>
					</a>
				</li>
				<li className='hidden'>
					<a href='#' alt='mail' title='Mail'>
						<i className='fa-solid fa-envelope '></i>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
