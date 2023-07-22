import { gsap } from 'gsap';

const $bigBall = document.querySelector('.cursor__ball--big') as HTMLDivElement;
const $smallBall = document.querySelector(
	'.cursor__ball--small'
) as HTMLDivElement;
const $hoverables = document.querySelectorAll('.hoverable');
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

for (let i = 0; i < $hoverables.length; i++) {
	$hoverables[i].addEventListener('mouseenter', onMouseHover);
	$hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}
function showCursor() {
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
}
function unShowCursor() {
	$bigBall.classList.remove('opacityCursor');
	$smallBall.classList.remove('opacityCursor');
}
function opacityCursorMouse(e: MouseEvent) {
	gsap.to($bigBall, {
		duration: 0.4,
		x: e.clientX - 15,
		y: e.clientY - 15,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: e.clientX - 5,
		y: e.clientY - 7,
	});
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
	controller.abort();
}
function opacityCursorTouch(e: TouchEvent) {
	gsap.to($bigBall, {
		duration: 0,
		x: e.touches[0].clientX,
		y: e.touches[0].clientY,
	});
	gsap.to($smallBall, {
		duration: 0,
		x: e.touches[0].clientX,
		y: e.touches[0].clientY,
	});
	$bigBall.classList.add('opacityCursor');
	$smallBall.classList.add('opacityCursor');
	controller.abort();
}
function onMouseMove(e: MouseEvent) {
	gsap.to($bigBall, {
		duration: 0.4,
		x: e.clientX - 15,
		y: e.clientY - 15,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: e.clientX - 5,
		y: e.clientY - 7,
	});
}
function onTouchMove(e: TouchEvent) {
	gsap.to($bigBall, {
		duration: 0.4,
		x: e.touches[0].clientX - 15,
		y: e.touches[0].clientY - 15,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: e.touches[0].clientX - 5,
		y: e.touches[0].clientY - 7,
	});
}
document.body.addEventListener('mouseout', () => {
	$bigBall.style.opacity = '0';
	$smallBall.style.opacity = '0';
});
document.body.addEventListener('mouseover', () => {
	$bigBall.style.opacity = '1';
	$smallBall.style.opacity = '1';
});
// Hover an element
function onMouseHover() {
	gsap.to($bigBall, {
		duration: 0.3,
		scale: 4,
	});
}
function onMouseHoverOut() {
	gsap.to($bigBall, {
		duration: 0.3,
		scale: 1,
	});
}
