import { useEventListener } from '@assets/hooks/useEventListener'
import { useFollowPointer } from '@assets/hooks/useFollowPointer'
import { Variants, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import './Cursor.css'
function Cursor() {
	const hoverables: Array<string> = ['BUTTON', 'A', 'LI']
	const ref = useRef(null)
	const { x, y } = useFollowPointer(ref)
	const [toogle, setToggle] = useState(false)
	const [hidden, setHidden] = useState(true)
	const variants: Variants = {
		hover: {
			scale: 3.5,
		},
		posBig: () => ({
			x: x,
			y: y,
			transition: {
				type: 'spring',
				stiffness: 500,
				damping: 38,
			},
		}),
		posSmall: () => ({
			x: x + 11,
			y: y + 11,
			transition: {
				type: 'tween',
				duration: 0.1,
			},
		}),
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
	}
	useEventListener('mousemove', (e: MouseEvent) => {
		const target = e.target as HTMLElement
		if (hoverables.includes(target.nodeName)) {
			setToggle(true)
		} else {
			setToggle(false)
		}
	})
	useEventListener('mouseover', () => {
		setHidden(false)
	})
	useEventListener('mouseout', () => {
		setHidden(true)
	})

	return (
		<>
			<div className='cursor'>
				<motion.div
					animate={['posBig', toogle ? 'hover' : '', hidden ? 'hidden' : '']}
					variants={variants}
					className='cursor__ball cursor__ball--big '
					ref={ref}
				>
					<svg height='30' width='30'>
						<circle cx='15' cy='15' r='12' strokeWidth='0'></circle>
					</svg>
				</motion.div>

				<motion.div
					animate={['posSmall', hidden ? 'hidden' : '']}
					variants={variants}
					className='cursor__ball cursor__ball--small'
				>
					<svg height='10' width='10'>
						<circle cx='5' cy='5' r='4' strokeWidth='0'></circle>
					</svg>
				</motion.div>
			</div>
		</>
	)
}

export default Cursor
