'use client'

import { containerVariants, propsHiddenElm } from '@assets/utils/props'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import s from './Footer.module.css'
import { footerVariants, links } from './dataFooter'
const Footer = () => {
	return (
		<footer id='contacto' className={s.footer_final}>
			<motion.h2 {...propsHiddenElm}>Contacto</motion.h2>
			<motion.ul
				initial='hidden'
				whileInView='visible'
				viewport={{
					once: true,
				}}
				className={s.ul_footer}
				variants={containerVariants}
			>
				{links.map(({ href, iconFontAwesome, title }, i) => {
					return (
						<motion.li
							key={i}
							whileHover={{
								scale: 1.2,
								transition: {
									type: 'spring',
									stiffness: 400,
									damping: 10,
								},
							}}
							variants={footerVariants}
						>
							<a href={href} title={title}>
								{/* <i className={iconFontAwesome}></i> */}
								<FontAwesomeIcon icon={iconFontAwesome} />
							</a>
						</motion.li>
					)
				})}
			</motion.ul>
		</footer>
	)
}

export default Footer
