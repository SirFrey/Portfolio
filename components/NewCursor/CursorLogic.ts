import { gsap } from 'gsap'

const $bigBall = document.querySelector('.cursor__ball--big') as HTMLDivElement
const $smallBall = document.querySelector(
	'.cursor__ball--small'
) as HTMLDivElement
// const $hoverables: NodeListOf<HTMLElement> =
// 	document.querySelectorAll('button, a, ul');
const controller = new AbortController()
const options: AddEventListenerOptions = {
	signal: controller.signal,
}
const ListHoverableEl: Array<string> = ['BUTTON', 'A', 'LI']

// Listeners
window.addEventListener('mousemove', onMouseMove)
window.addEventListener('touchmove', onTouchMove, {
	passive: true,
	capture: true,
})
window.addEventListener('touchstart', showCursorAndHover)
window.addEventListener('touchend', unShowCursorAndHoverOut)
window.addEventListener('mousemove', opacityCursorMouse, options)
window.addEventListener('touchmove', opacityCursorTouch, options)
window.addEventListener('touchcancel', () => {
	$bigBall.classList.remove('opacityCursor')
	$smallBall.classList.remove('opacityCursor')
})
window.addEventListener('touchstart', (e: TouchEvent) => {
	const target = e.target as HTMLElement
	if (ListHoverableEl.includes(target.nodeName)) {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 4,
		})
	}
})
window.addEventListener('touchend', e => {
	const target = e.target as HTMLElement
	if (ListHoverableEl.includes(target.nodeName)) {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 1,
		})
	}
})
window.addEventListener('pointermove', onMouseHover)
const logicPositionCursor = (e: MouseEvent) => {
	const posX = e.clientX
	const posY = e.clientY
	gsap.to($bigBall, {
		duration: 0.4,
		x: posX - 15,
		y: posY - 15,
	})
	gsap.to($smallBall, {
		duration: 0.1,
		x: posX - 5,
		y: posY - 7,
	})
}
function showCursorAndHover(e: TouchEvent) {
	const posX = e.touches[0].clientX
	const posY = e.touches[0].clientY
	const target = e.target as HTMLElement
	gsap.to($bigBall, {
		duration: 0,
		x: posX - 15,
		y: posY - 15,
	})
	gsap.to($smallBall, {
		duration: 0,
		x: posX - 5,
		y: posY - 7,
	})
	$bigBall.classList.add('opacityCursor')
	$smallBall.classList.add('opacityCursor')
	if (ListHoverableEl.includes(target.nodeName)) {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 4,
		})
	}
}
function unShowCursorAndHoverOut(e: MouseEvent) {
	$bigBall.classList.remove('opacityCursor')
	$smallBall.classList.remove('opacityCursor')
}
function opacityCursorMouse(e: MouseEvent) {
	const posX = e.clientX
	const posY = e.clientY
	gsap.to($bigBall, {
		duration: 0.4,
		x: posX - 15,
		y: posY - 15,
	})
	gsap.to($smallBall, {
		duration: 0.1,
		x: posX - 5,
		y: posY - 7,
	})
	$bigBall.classList.add('opacityCursor')
	$smallBall.classList.add('opacityCursor')
	controller.abort()
}
function opacityCursorTouch(e: TouchEvent) {
	const posX = e.touches[0].clientX
	const posY = e.touches[0].clientY
	gsap.to($bigBall, {
		duration: 0,
		x: posX - 15,
		y: posY - 15,
	})
	gsap.to($smallBall, {
		duration: 0,
		x: posX - 5,
		y: posY - 7,
	})
	$bigBall.classList.add('opacityCursor')
	$smallBall.classList.add('opacityCursor')
	controller.abort()
}
function onMouseMove(e: MouseEvent) {
	logicPositionCursor(e)
}
function onTouchMove(e: TouchEvent) {
	const posX = e.touches[0].clientX
	const posY = e.touches[0].clientY
	gsap.to($bigBall, {
		duration: 0.4,
		x: posX - 15,
		y: posY - 15,
	})
	gsap.to($smallBall, {
		duration: 0.1,
		x: posX - 5,
		y: posY - 7,
	})
}
window.addEventListener('mouseout', () => {
	$bigBall.classList.remove('opacityCursor')
	$smallBall.classList.remove('opacityCursor')
})
window.addEventListener('mouseover', () => {
	$bigBall.classList.add('opacityCursor')
	$smallBall.classList.add('opacityCursor')
})

window.addEventListener('pointerup', (e: PointerEvent) => {
	if (e.pointerType === 'touch') {
		setTimeout(() => {
			$bigBall.classList.remove('opacityCursor')
			$smallBall.classList.remove('opacityCursor')
		}, 300)
	}
})
// Hover an element
function onMouseHover(e: PointerEvent) {
	const target = e.target as HTMLElement
	if (ListHoverableEl.includes(target.nodeName) && e.pointerType === 'mouse') {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 3.7,
		})
	} else {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 1,
		})
	}
}
