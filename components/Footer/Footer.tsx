import { containerVariants, propsHiddenElm } from '@assets/utils/props'
import {
	MotionH2,
	MotionLi,
	MotionUl,
} from '@components/FramerComps/framerCompsClients'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './Footer.module.css'
import { footerVariants, links } from './dataFooter'
const Footer = () => {
	return (
		<footer id='contacto' className={s.footer_final}>
			<MotionH2 {...propsHiddenElm}>Contacto</MotionH2>
			<MotionUl
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
						<MotionLi
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
						</MotionLi>
					)
				})}
			</MotionUl>
		</footer>
	)
}

export default Footer
