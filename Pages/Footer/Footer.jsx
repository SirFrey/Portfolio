import s from './Footer.module.css';
console.log(s);
const Footer = () => {
	return (
		<footer className={`${s.footer_final}`}>
			<h2 id='Contacto'>Contactame</h2>
			<ul className={`${s.ul_footer}`}>
				<li>
					<a href='#'>
						<i className='fa-brands fa-linkedin'></i>
					</a>
				</li>
				<li>
					<a href='#'>
						<i className='fa-brands fa-discord'></i>
					</a>
				</li>
				<li>
					<a href='#'>
						<i className='fa-brands fa-instagram'></i>
					</a>
				</li>
				<li>
					<a href='#'>
						<i className='fa-solid fa-envelope'></i>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
