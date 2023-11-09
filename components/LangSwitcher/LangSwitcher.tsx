'use client'

import Image from 'next/image'
import Link from 'next/link'
import s from './LangSwitcher.module.css'
import enFlag from './spain-flag-icon.svg'
import esFlag from './united-kingdom-flag-icon.svg'
function LangSwitcher({ lang }) {
	return (
		<Link
			href={`/${lang === 'es' ? 'en' : 'es'}`}
			className={s.langSwitcher}
			scroll={false}
		>
			{lang === 'es' ? (
				<Image src={esFlag} alt='en' />
			) : (
				<Image src={enFlag} alt='es' />
			)}
		</Link>
	)
}

export default LangSwitcher
