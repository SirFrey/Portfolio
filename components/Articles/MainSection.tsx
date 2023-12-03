'use client'
import s from './Articles.module.css'

import { propsHiddenElm } from '@assets/utils/props'
import { MotionH1, MotionH2 } from '@components/FramerComps/framerCompsClients'
import SDownComp from '@components/ScrolllDownComp/SDownComp'
import background from '@public/background.jpg'
import NextImage from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useRef } from 'react'

export function MainSection({ dict }) {
	const mainSection = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		const imageSection = new Image()
		imageSection.addEventListener('load', e => {
			const target = e.target as HTMLImageElement
			if (mainSection.current) {
				mainSection.current.style.backgroundImage = `url(${target.src})`
				mainSection.current.classList.add(s.load)
			}
		})
		imageSection.src =
			'https://img.freepik.com/foto-gratis/diseno-concepto-plantilla-diseno-web-html_53876-120438.jpg?w=900&t=st=1660676885~exp=1660677485~hmac=2899e1383827e6af6608d048fbba3d6958763202894ec02e3e5bb4d598f6e3b5'
	}, [])
	return (
		<section id='inicio'>
			<NextImage
				src={background}
				className={s.backgroundImg}
				fill={true}
				priority={true}
				alt='background'
				style={{
					objectFit: 'cover',
				}}
				placeholder='blur'
				blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAE7AnYDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACcQAQEBAAAGAgICAgMAAAAAAAABEQISITFRYUFxofAikUKBMtHx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBQVH/2gAMAwEAAhEDEQA/ANCAKgACgIKAgoCCgIKAgHwAKAgoCCiCAqgAgAAACgCoAIoqLDBQFQAAAAAAAAAAAAQAAAAAFRQAAGWmQAAEAAEUAAQAEAARUAAAAQdBUBQAAAAABAFAAAAT4VACigyqgIoIIoKAJUFEBVAAAEAFBYgitCCooAAA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'
			/>
			<div className={s.filterMainSection}>
				<div className='marginContainer'>
					<MotionH1 {...propsHiddenElm} className={`${s.titleH1}`}>
						{dict.mainsection.titleh1}
					</MotionH1>
					<MotionH2 {...propsHiddenElm} className={`${s.sectionCareer}`}>
						{dict.mainsection.subtitleh2}
					</MotionH2>
					<Link href='/' locale='es'></Link>
				</div>
			</div>
			<div className={s.wave4}>
				<svg
					data-name='Layer 1'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
				>
					<path
						d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
						opacity='.25'
						className={s.shapeFill}
					></path>
					<path
						d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
						opacity='.5'
						className={s.shapeFill}
					></path>
					<path
						d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
						className={s.shapeFill}
					></path>
				</svg>
			</div>
			<SDownComp />
		</section>
	)
}
