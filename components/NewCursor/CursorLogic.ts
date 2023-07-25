import { gsap } from 'gsap';

const $bigBall = document.querySelector('.cursor__ball--big') as HTMLDivElement;
const $smallBall = document.querySelector(
	'.cursor__ball--small'
) as HTMLDivElement;
// const $hoverables: NodeListOf<HTMLElement> =
// 	document.querySelectorAll('button, a, ul');
const controller = new AbortController();
const options: AddEventListenerOptions = {
	signal: controller.signal,
};

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
document.body.addEventListener('touchmove', onTouchMove, {
	passive: true,
	capture: true,
});
document.body.addEventListener('touchstart', showCursor);
document.body.addEventListener('touchend', unShowCursor);
document.body.addEventListener('mousemove', opacityCursorMouse, options);
document.body.addEventListener('touchmove', opacityCursorTouch, options);
document.body.addEventListener('touchcancel', () => {
	$smallBall.style.opacity = '0';
	$bigBall.style.opacity = '0';
});
// for (let i = 0; i < $hoverables.length; i++) {
// 	$hoverables[i].addEventListener('mouseover', onMouseHover);
// 	$hoverables[i].addEventListener('mouseout', onMouseHoverOut);
// }
window.addEventListener('pointermove', onMouseHover);
const logicPositionCursor = (e: MouseEvent) => {
	const posX = e.clientX;
	const posY = e.clientY;
	gsap.to($bigBall, {
		duration: 0.4,
		x: posX - 15,
		y: posY - 15,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: posX - 5,
		y: posY - 7,
	});
};
function showCursor(e: TouchEvent) {
	const posX = e.touches[0].clientX;
	const posY = e.touches[0].clientY;
	gsap.to($bigBall, {
		duration: 0,
		x: posX,
		y: posY,
	});
	gsap.to($smallBall, {
		duration: 0,
		x: posX,
		y: posY,
	});
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
}
function unShowCursor() {
	$bigBall.classList.remove('opacityCursor');
	$smallBall.classList.remove('opacityCursor');
}
function opacityCursorMouse(e: MouseEvent) {
	const posX = e.clientX;
	const posY = e.clientY;
	gsap.to($bigBall, {
		duration: 0.4,
		x: posX,
		y: posY,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: posX,
		y: posY,
	});
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
	controller.abort();
}
function opacityCursorTouch(e: TouchEvent) {
	const posX = e.touches[0].clientX;
	const posY = e.touches[0].clientY;
	gsap.to($bigBall, {
		duration: 0,
		x: posX,
		y: posY,
	});
	gsap.to($smallBall, {
		duration: 0,
		x: posX,
		y: posY,
	});
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
	controller.abort();
}
function onMouseMove(e: MouseEvent) {
	logicPositionCursor(e);
}
function onTouchMove(e: TouchEvent) {
	const posX = e.touches[0].clientX;
	const posY = e.touches[0].clientY;
	gsap.to($bigBall, {
		duration: 0.4,
		x: posX - 15,
		y: posY - 15,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: posX - 5,
		y: posY - 7,
	});
}

document.body.addEventListener('mouseout', () => {
	$bigBall.classList.remove('opacityCursor');
	$smallBall.classList.remove('opacityCursor');
});
document.body.addEventListener('mouseover', () => {
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
});

document.body.addEventListener('pointerup', (e: PointerEvent) => {
	if (e.pointerType === 'touch') {
		setTimeout(() => {
			$bigBall.classList.remove('opacityCursor');
			$smallBall.classList.remove('opacityCursor');
		}, 300);
	}
});
const ListHoverableEl: Array<string> = ['BUTTON', 'A', 'LI'];
// Hover an element
function onMouseHover(e: PointerEvent) {
	const target = e.target as HTMLElement;
	console.log(target.nodeName);
	if (ListHoverableEl.includes(target.nodeName) && e.pointerType === 'mouse') {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 4,
		});
	} else {
		gsap.to($bigBall, {
			duration: 0.3,
			scale: 1,
		});
	}
}
